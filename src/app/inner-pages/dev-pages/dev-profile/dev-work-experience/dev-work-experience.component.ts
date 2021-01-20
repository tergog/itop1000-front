import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, first, map, tap, takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { DevelopersService, UtilsService } from 'app/shared/services';
import { DevProperties, NameValueModel, UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { UpdateUserProfileAction } from 'app/core/actions/core.actions';
import { getDeveloperSkills } from 'app/core/developers/store/developers.actions';
import * as fromDev from 'app/core/developers/store';

@Component({
  selector: 'app-dev-work-experience',
  templateUrl: './dev-work-experience.component.html',
  styleUrls: ['./dev-work-experience.component.scss'],
})
export class DevWorkExperienceComponent implements OnInit, OnDestroy, AfterViewInit {

  public isNewProject: boolean;
  public form: FormGroup;
  public userInfo$: Observable<UserInfo>;
  public userInfo: UserInfo;
  public ngUnsubscribe$ = new Subject<void>();
  @ViewChild('category', {static: false}) category: ElementRef;

  showError: boolean;

  public logoUrl: string;
  public projectImages: string[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public allTechnologies: NameValueModel[] = [];
  public selectedTechnologies: NameValueModel[] = [];
  public availableTechnologies: Subject<NameValueModel[]> = new Subject<NameValueModel[]>();
  public availableTechnologies$: Observable<NameValueModel[]> = this.availableTechnologies.asObservable().pipe(
    map(val => this.allTechnologies.filter(skill => !val.find(item => item.value === skill.value))));

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService,
    private matDialog: MatDialog,
    private developersService: DevelopersService,
    private utilsService: UtilsService,
    private developerService: DevelopersService,
    private storeDev: Store<fromDev.State>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.userInfo$ = this.store.select(fromCore.getUserInfo).pipe(
      tap((userInfo: UserInfo) => {
        console.log(userInfo);
        this.devProfileService.devProperties = userInfo.devProperties;
        this.userInfo = userInfo;
        // this.updateTechnologies(this.selectedTechnologies);
      })
    );

    this.developerService.getDeveloperSkills().pipe(
      first()
    ).subscribe(value => this.storeDev.dispatch(getDeveloperSkills(value)));
  }

  ngAfterViewInit(): void {
    this.storeDev.select(fromDev.getSkills)
      .pipe(
        filter(res => !!res.length),
        first()
      )
      .subscribe(res => {
        this.allTechnologies = res;
        this.availableTechnologies.next(this.selectedTechnologies);
        this.cdr.detectChanges();
      });
  }

  public onAddClick(): void {
    this.isNewProject = !this.isNewProject;
  }

  public onCancelClick(): void {
    this.projectImages = [];
    this.logoUrl = '';
    this.isNewProject = !this.isNewProject;
  }

  public onSaveClick(): void {
    if (!this.form.valid) {
      this.showError = true;
      return;
    }
    this.showError = false;
    const newDevProperties: DevProperties = {projects: [...(this.userInfo.devProperties.projects || []), this.form.value]};
    this.userInfo = {...this.userInfo, devProperties: newDevProperties};
    this.store.dispatch(new UpdateUserProfileAction(this.userInfo));
    this.devProfileService.onSaveClick({devProperties: newDevProperties});
    this.isNewProject = false;
    this.selectedTechnologies = [];
  }

  public onTechnologySelect({ option }: any): void {
    this.selectedTechnologies.push(option.value);
    this.availableTechnologies.next(this.selectedTechnologies);
    this.form.get('technologies').patchValue(this.selectedTechnologies);
    this.focusReset();
  }

  public onTechnologyRemove(technology: NameValueModel): void {
    this.selectedTechnologies = this.selectedTechnologies.filter(item => item.value !== technology.value);
    this.availableTechnologies.next(this.selectedTechnologies);
    this.form.get('technologies').patchValue(this.selectedTechnologies);
    this.focusReset();
  }

  focusReset(): void {
    this.category.nativeElement.blur();
    setTimeout(() => this.category.nativeElement.focus(), 0);
  }

  public openUploadImageDialog(forLogo: boolean = false): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      destination: 'Project'
    };

    this.matDialog.open(UploadPhotoDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        first()
      )
      .subscribe((image: string) => this.uploadImage(image, forLogo));
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(8)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      technologies: new FormControl([], [Validators.required]),
      link: new FormControl('', [Validators.required, this.utilsService.linkValidator()]),
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
    });
  }

  private uploadImage(image: string, forLogo: boolean): void {
    this.developersService.uploadProjectImage(image)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        url => forLogo ? this.logoUrl = url : this.projectImages.push(url),
        ({error}) => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

}
