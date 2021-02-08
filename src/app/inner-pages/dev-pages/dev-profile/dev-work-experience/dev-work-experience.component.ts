import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subject } from 'rxjs';
import { filter, first, tap, takeUntil, catchError } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { DevelopersService, UtilsService } from 'app/shared/services';
import { DevProperties, NameValueModel, UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { UpdateUserProfileAction } from 'app/core/actions/core.actions';


@Component({
  selector: 'app-dev-work-experience',
  templateUrl: './dev-work-experience.component.html',
  styleUrls: ['./dev-work-experience.component.scss'],
})
export class DevWorkExperienceComponent implements OnInit, OnDestroy {

  @Input() isEdit: boolean;
  public isNewProject: boolean;
  public form: FormGroup;
  public userInfo$: Observable<UserInfo>;
  public userInfo: UserInfo;
  public ngUnsubscribe$ = new Subject<void>();
  public showError: boolean;
  public logoUrl: string;
  public projectImages: string[] = [];
  public allSkills$: Observable<NameValueModel[]>;

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService,
    private matDialog: MatDialog,
    private developersService: DevelopersService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.userInfo$ = this.store.select(fromCore.getUserInfo).pipe(
      tap((userInfo: UserInfo) => {
        this.devProfileService.devProperties = userInfo.devProperties;
        this.userInfo = userInfo;
      }),
      catchError(_ => EMPTY)
    );
    this.allSkills$ = this.devProfileService.getStaticData('Skills');
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
    if (!this.form.value.technologies.length) {
      this.showError = true;
      return;
    }

    if (!this.form.valid) {
      this.showError = true;
      return;
    }
    const newDevProperties: DevProperties = { ...this.userInfo.devProperties || {}, projects: [...(this.userInfo.devProperties.projects || []), this.form.value] };

    this.userInfo = { ...this.userInfo, devProperties: newDevProperties };
    this.store.dispatch(new UpdateUserProfileAction(this.userInfo));
    this.devProfileService.onSaveClick({ devProperties: newDevProperties });
    this.isNewProject = false;
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
      .subscribe((image: FormData) => this.uploadImage(image, forLogo));
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(8)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      technologies: new FormControl([], []),
      link: new FormControl('', [Validators.required, this.utilsService.linkValidator()]),
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
    });
  }

  private uploadImage(image: FormData, forLogo: boolean): void {
    this.developersService.uploadProjectImage(image, 0)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        url => forLogo ? this.logoUrl = url : this.projectImages.push(url),
        ({ error }) => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
