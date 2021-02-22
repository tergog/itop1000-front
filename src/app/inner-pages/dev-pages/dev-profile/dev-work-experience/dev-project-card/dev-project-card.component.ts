import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';

import * as fromCore from 'app/core/reducers';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserService, NotificationsService, DevelopersService } from 'app/shared/services';
import { DevProject } from 'app/shared/models/dev-project.model';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { NameValueModel } from 'app/shared/models';
import { DevProjectsService } from 'app/shared/services/dev-projects.service';
import { UpdateProjectAction } from 'app/core/actions/core.actions';
import { ImgResponse } from 'app/shared/models/uploadImgResponse';

@Component({
  selector: 'app-dev-project-card',
  templateUrl: './dev-project-card.component.html',
  styleUrls: ['./dev-project-card.component.scss']
})
export class DevProjectCardComponent implements OnInit {

  @Input() project: DevProject;
  @Input() id: number;

  public logoUrl: string;
  public projectImages: string[];
  public form: FormGroup;
  public isEdit = false;
  public allSkills$: Observable<NameValueModel[]>;

  constructor(
    private devProjectsService: DevProjectsService,
    private devProfileService: DevProfileService,
    private notificationsService: NotificationsService,
    private userService: UserService,
    private store: Store<fromCore.State>,
    private matDialog: MatDialog,
    private developersService: DevelopersService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo);
    this.form.get('technologies').setValue(cloneDeep(this.project.technologies));
    this.logoUrl = this.project.logo;
    this.projectImages = this.project.images;
    this.allSkills$ = this.devProfileService.getStaticData('Skills');
  }

  private disableEmptyFields(): void {
      Object.keys(this.form.controls).forEach(field => {
          return this.form.controls[field].value || this.form.controls[field].disable();
        });
      }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
    this.logoUrl = this.project.logo;
    this.projectImages = this.project.images;
  }

  public onSaveClick(): void {

    this.disableEmptyFields();


    const updatedProject: DevProject = {
      ...this.form.value,
      id: this.project.id,
      logo: this.logoUrl,
      images: this.projectImages
    };

    this.devProjectsService.update(updatedProject)
      .pipe(first())
      .subscribe((res: DevProject) => this.store.dispatch(new UpdateProjectAction(res, this.id)));

    this.isEdit = false;
  }

  public openUploadPhotoDialog(forLogo: boolean = false, index?: number): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      destination: ( !forLogo ) ? 'ProjectImage' : 'ProjectLogo'
    };

    this.matDialog.open(UploadPhotoDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        first()
      )
      .subscribe((image: FormData | string) => image === 'delete' ? this.deleteImage(forLogo, index) : this.uploadProjectImages(image as FormData, forLogo));
  }

  private deleteImage(forLogo: boolean, index: number): void {
    forLogo ? this.deleteLogo() : this.deleteFromProjectImages(index);
  }

  private deleteLogo(): void {
    this.logoUrl = '';
  }

  private deleteFromProjectImages(index: number): void {
    const newImages = [...this.projectImages];
    console.log(newImages);
    newImages.splice(index, 1);

    console.log(newImages);
    this.projectImages = newImages;
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.project.title, []),
      description: new FormControl(this.project.description, []),
      technologies: new FormControl([], []),
      link: new FormControl(this.project.link, []),
      from: new FormControl(this.project.from, []),
      to: new FormControl(this.project.to, []),
    });
  }


  private uploadProjectImages(image: FormData, forLogo: boolean = false): void {
    forLogo ?
      this.uploadLogo(image)
      :
      this.devProjectsService.uploadImage(image).subscribe(res => {
        this.projectImages = [ ...this.projectImages, res.image as string ];
      });
  }

  private uploadLogo(image: FormData): void {
    this.devProjectsService.uploadLogo(image)
      .subscribe(
        (res: ImgResponse) => {
            this.logoUrl = res.image as string;
        },
        ({error}) => console.log(error)
      );
  }
}
