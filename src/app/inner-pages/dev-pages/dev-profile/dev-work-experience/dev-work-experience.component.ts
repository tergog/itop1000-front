import { DevelopersService } from 'app/shared/services';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import xorBy from 'lodash.xorby';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { NameValueModel, UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';


@Component({
  selector: 'app-dev-work-experience',
  templateUrl: './dev-work-experience.component.html',
  styleUrls: ['./dev-work-experience.component.scss'],
})
export class DevWorkExperienceComponent implements OnInit, OnDestroy {

  public isNewProject: boolean;
  public form: FormGroup;
  public userInfo$: Observable<UserInfo>;

  public logoUrl: string;
  public projectImages: string[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedTechnologies = [];
  public availableTechnologies: NameValueModel[] = [

    {name: 'Javascript', value: 1},
    {name: 'Typescript', value: 2},
    {name: 'CSS3', value: 3},
    {name: 'HTML5', value: 5},
    {name: 'AngularJS', value: 6},
    {name: 'Angular 9', value: 7},
    {name: 'Angular 10', value: 8},
    {name: 'Angular 7', value: 9},
    {name: 'Angular 8', value: 10},
    {name: 'Angular 2+', value: 11},

  ];

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService,
    private matDialog: MatDialog,
    private developersService: DevelopersService
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    this.userInfo$ = this.store.select(fromCore.getUserInfo);

    this.store.select(fromCore.getUserInfo)
      .pipe(first())
      .subscribe((userInfo: UserInfo) => {
        this.devProfileService.devProperties = userInfo.devProperties;
        this.updateTechnologies(this.selectedTechnologies);
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
    this.disableEmptyFields();
    this.devProfileService.devProperties = {
      ...this.devProfileService.devProperties,
      projects: [
        ...this.devProfileService.devProperties.projects,
        {
          ...this.form.value,
          technologies: [...this.selectedTechnologies],
          logo: this.logoUrl,
          images: this.projectImages,
        }
      ]
    };

    this.devProfileService.onSaveClick({devProperties: this.devProfileService.devProperties});
    this.isNewProject = false;
  }

  public onTechnologySelect({ option }: any): void {
    this.availableTechnologies = this.availableTechnologies.filter(technology => technology.value !== option.value.value);
    this.selectedTechnologies.push(option.value);
  }

  public onTechnologyRemove(technology: NameValueModel): void {
    this.selectedTechnologies = this.selectedTechnologies.filter(item => item.value !== technology.value);
    this.availableTechnologies.push(technology);
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
      title: new FormControl('', []),
      description: new FormControl('', []),
      technologies: new FormControl([], []),
      link: new FormControl('', []),
      from: new FormControl('', []),
      to: new FormControl('', []),
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

  private updateTechnologies(technologies: NameValueModel[]): void {
    this.selectedTechnologies = [...technologies];
    this.availableTechnologies = xorBy(this.selectedTechnologies, this.availableTechnologies);
  }

  private uploadImage(image: string, forLogo: boolean): void {
    this.developersService.uploadProjectImage(image)
      .pipe(untilDestroyed(this))
      .subscribe(
        url => forLogo ? this.logoUrl = url : this.projectImages.push(url),
        ({error}) => console.log(error)
      );
  }

  ngOnDestroy(): void {
  }

}
