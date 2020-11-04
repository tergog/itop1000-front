import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import * as coreActions from 'app/core/actions/core.actions';
import * as fromCore from 'app/core/reducers';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserService, NotificationsService, DevelopersService } from 'app/shared/services';
import { DevProject } from 'app/shared/models/dev-project.model';
import { NameValueModel } from 'app/shared/models/name-value.model';
import { UploadPhotoDialogComponent } from '../../../../shared/components/upload-photo-dialog/upload-photo-dialog.component';


@Component({
  selector: 'app-dev-project-card',
  templateUrl: './dev-project-card.component.html',
  styleUrls: ['./dev-project-card.component.scss']
})
export class DevProjectCardComponent implements OnInit {

  @Input() project: DevProject;
  @Input() id: number;

  public imageUrl: string;
  public form: FormGroup;
  public isEdit = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedTechnologies = [];
  public availableTechnologies: NameValueModel[] = [
    { name: 'Javascript', value: 1 },
    { name: 'Typescript', value: 2 },
    { name: 'CSS3', value: 3 },
    { name: 'HTML5', value: 5 },
    { name: 'AngularJS', value: 6 },
    { name: 'Angular 9', value: 7 },
    { name: 'Angular 10', value: 8 },
    { name: 'Angular 7', value: 9 },
    { name: 'Angular 8', value: 10 },
    { name: 'Angular 2+', value: 11 },
  ];

  constructor(
    private devProfileService: DevProfileService,
    private notificationsService: NotificationsService,
    private userService: UserService,
    private store: Store<fromCore.State>,
    private matDialog: MatDialog,
    private developersService: DevelopersService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo);
    this.updateTechnologies(this.project.technologies);
    this.imageUrl = this.project.logo;
  }

  private disableEmptyFields(): void {
      Object.keys(this.form.controls).forEach(field => {
          return this.form.controls[field].value || this.form.controls[field].disable();
        });
      }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
    this.imageUrl = this.project.logo;
  }

  public onSaveClick(): void {
    this.disableEmptyFields();
    const arr = [...this.devProfileService.devProperties.projects];
    const updatedProject = {...this.form.value, technologies: [...this.selectedTechnologies], photo: this.imageUrl};
    arr.splice(this.id, 1, updatedProject);

    this.devProfileService.devProperties = {
      ...this.devProfileService.devProperties,
      projects: arr
    };
    this.devProfileService.onSaveClick({ devProperties: this.devProfileService.devProperties });
    this.store.dispatch(new coreActions.UpdateProjectImageAction(this.imageUrl, this.id));
    this.isEdit = false;
  }

  public onTechnologySelect({ option }): void {
    this.availableTechnologies = this.availableTechnologies.filter(technology => technology.value !== option.value.value);
    this.selectedTechnologies.push(option.value);
  }

  public onTechnologyRemove(technology: NameValueModel): void {
    this.selectedTechnologies = this.selectedTechnologies.filter(item => item.value !== technology.value);
    this.availableTechnologies.push(technology);
  }

  public openUploadPhotoDialog(): void {

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
      .subscribe((image: string) => this.uploadImage(image));
  }

  deleteImage() {
    this.imageUrl = '';
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.project.title, []),
      description: new FormControl(this.project.description, []),
      technologies: new FormControl([], []),
      link: new FormControl(this.project.link, []),
    });
  }

  private updateTechnologies(technologies: NameValueModel[]): void {
    this.selectedTechnologies = [ ...technologies ];

    this.availableTechnologies = this.availableTechnologies
      .filter(
        (technology) => !this.selectedTechnologies.find(selectedTechnology => selectedTechnology.value === technology.value)
      );
  }

  private uploadImage(image: string): void {
    this.developersService.uploadProjectLogo(this.id, image)
      .subscribe(
        (url) => {
          this.imageUrl = url;
        },
        ({ error }) => console.log(error)
      );
  }


}
