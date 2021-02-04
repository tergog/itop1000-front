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

import * as coreActions from 'app/core/actions/core.actions';
import * as fromCore from 'app/core/reducers';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserService, NotificationsService, DevelopersService } from 'app/shared/services';
import { DevProject } from 'app/shared/models/dev-project.model';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { NameValueModel } from 'app/shared/models';

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
    console.log(this.projectImages, this.project.images);
    this.projectImages = this.project.images;

  }

  public onSaveClick(): void {

    this.disableEmptyFields();

    const arr = [...this.devProfileService.devProperties.projects];

    const updatedProject = {
      ...this.form.value,
      logo: this.logoUrl,
      images: this.projectImages
    };
    arr.splice(this.id, 1, updatedProject);

    this.devProfileService.devProperties = {
      ...this.devProfileService.devProperties,
      projects: arr
    };

    this.devProfileService.onSaveClick({ devProperties: this.devProfileService.devProperties });
    this.store.dispatch(new coreActions.UpdateProjectImageAction(this.logoUrl, this.id));
    this.isEdit = false;
  }

  public openUploadPhotoDialog(forLogo: boolean = false, id?: number): void {

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
      .subscribe((image: string) => image === 'delete' ? this.deleteImage(forLogo, id) : this.uploadProjectImages(image, forLogo, id) );
  }

  private deleteImage(forLogo: boolean, id?: number): void {
    forLogo ? this.deleteLogo() : this.deleteFromProjectImages(id);
  }

  private deleteLogo(): void {
    this.logoUrl = '';
  }

  private deleteFromProjectImages(id: number): void {
    this.projectImages = this.projectImages.filter( (image, index) =>  index !== id);
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


  private uploadProjectImages(image: string, forLogo: boolean = false, id?: number): void {
    forLogo ? this.uploadLogo(image) : this.uploadImage(image, id);
  }

  private uploadLogo(image: string): void {
    this.developersService.uploadProjectImage(image, this.id)
      .subscribe(
        (url) => {
            this.logoUrl = url;
        },
        ({error}) => console.log(error)
      );
  }

  private uploadImage(image: string, id?: number): void {
    this.developersService.uploadProjectImage(image, id)
      .subscribe(
        (url) => {
          const project = Object.assign([], this.projectImages);
          (id || project[id]) ? project[id] = url : project.push(url);
          this.projectImages = project;
        },
        ({error}) => console.log(error)
      );
  }
}
