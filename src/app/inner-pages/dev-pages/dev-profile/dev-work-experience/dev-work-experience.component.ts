import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { DevelopersService, UtilsService } from 'app/shared/services';
import { NameValueModel } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { AddProjectAction, LoadProjectsAction } from 'app/core/actions/core.actions';
import { DevProjectsService } from 'app/shared/services/dev-projects.service';
import { getDevProjects } from 'app/core/reducers';


@Component({
  selector: 'app-dev-work-experience',
  templateUrl: './dev-work-experience.component.html',
  styleUrls: ['./dev-work-experience.component.scss'],
})
export class DevWorkExperienceComponent implements OnInit, OnDestroy {

  @Input() isEdit: boolean;
  public isNewProject: boolean;
  public form: FormGroup;
  public ngUnsubscribe$ = new Subject<void>();
  public showError: boolean;
  public logoUrl: string;
  public projectImages: string[] = [];
  public allSkills$: Observable<NameValueModel[]>;
  public projects$ = this.store.select(getDevProjects);

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService,
    private matDialog: MatDialog,
    private developersService: DevelopersService,
    private utilsService: UtilsService,
    private devProjectsService: DevProjectsService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadProjectsAction());
    this.initForm();
    this.allSkills$ = this.devProfileService.getStaticData('Skills');
  }

  public onAddClick(): void {
    this.isNewProject = !this.isNewProject;
  }

  public onCancelClick(): void {
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
    this.devProjectsService.create({ ...this.form.value, logo: this.logoUrl || '', images: this.projectImages || [] })
      .subscribe(res => this.store.dispatch(new AddProjectAction(res)));
    this.isNewProject = false;
    this.projectImages = [];
    this.logoUrl = '';
    this.form.reset();
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
      .subscribe((image: FormData) => this.updateImages(image, forLogo));
  }

  private updateImages(image: FormData, forLogo: boolean): void {
    if (forLogo) {
      this.devProjectsService.uploadImage(image).pipe(first()).subscribe(res => this.logoUrl = res.image as string);
    } else {
      this.devProjectsService.uploadImage(image).pipe(first()).subscribe(res => this.projectImages.push(res.image as string));
    }
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


  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
