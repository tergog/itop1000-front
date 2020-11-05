import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';

import { TOKEN } from 'app/constants/constants';
import * as coreActions from 'app/core/actions/core.actions';
import * as fromCore from 'app/core/reducers';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { UserService, NotificationsService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models/user-info.model';
import { DevProject } from 'app/shared/models/dev-project.model';
import { NameValueModel } from 'app/shared/models/name-value.model';

@Component({
  selector: 'app-dev-project-card',
  templateUrl: './dev-project-card.component.html',
  styleUrls: ['./dev-project-card.component.scss']
})
export class DevProjectCardComponent implements OnInit {

  @Input() project: DevProject;

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
    private store: Store<fromCore.State>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo);
    this.updateTechnologies(this.project.technologies);
  }

  private disableEmptyFields(): void {
      Object.keys(this.form.controls).forEach(field => {
          return this.form.controls[field].value || this.form.controls[field].disable();
        });
      }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  public onCancelClick(): void {
    this.isEdit = !this.isEdit;
  }

  public onSaveClick(): void {
    this.disableEmptyFields();
    const arr = [...this.devProfileService.devProperties.projects];
    const idx = arr.indexOf(this.form.value);
    arr.splice(idx, 1, this.form.value);

    this.devProfileService.devProperties = {
      ...this.devProfileService.devProperties,
      projects: arr,
    };
    this.devProfileService.onSaveClick({ devProperties: this.devProfileService.devProperties });
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

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', []),
      description: new FormControl('', []),
      technologies: new FormControl([], []),
      link: new FormControl('', []),
    });
  }

  private updateTechnologies(technologies: NameValueModel[]): void {
    this.selectedTechnologies = [ ...technologies ];

    this.availableTechnologies = this.availableTechnologies
      .filter(
        (technology) => !this.selectedTechnologies.find(selectedTechnology => selectedTechnology.value === technology.value)
      );
  }
}