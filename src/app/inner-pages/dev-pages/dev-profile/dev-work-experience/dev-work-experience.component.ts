import { NotificationsService, UserService } from 'app/shared/services';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import xorBy from 'lodash.xorby';
import * as jwtDecode from 'jwt-decode';


import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { NameValueModel, UserInfo, Developer } from 'app/shared/models';
import { DevProject } from 'app/shared/models/dev-project.model';
import * as fromCore from 'app/core/reducers';
import * as coreActions from 'app/core/actions/core.actions';
import { getDeveloper } from 'app/core/reducers/index';
import { TOKEN } from 'app/constants/constants';

@Component({
  selector: 'app-dev-work-experience',
  templateUrl: './dev-work-experience.component.html',
  styleUrls: ['./dev-work-experience.component.scss']
})
export class DevWorkExperienceComponent implements OnInit {

  public isNewProject: boolean;
  public form: FormGroup;
  public userInfo$: Observable<UserInfo>;

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
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService
    ) {}

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
    this.isNewProject = !this.isNewProject;
  }

  public onSaveClick(): void {
    this.disableEmptyFields();
    debugger
    this.devProfileService.devProperties = {
      ...this.devProfileService.devProperties,
      projects: [
        ...this.devProfileService.devProperties.projects,
        this.form.value
      ]
    };

    this.devProfileService.onSaveClick({devProperties: this.devProfileService.devProperties });
    this.isNewProject = false;
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
      link: new FormControl('', [])
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

  private updateTechnologies(technologies: DevProject['technologies']): void {
    this.selectedTechnologies = [ ...technologies ] || [];

    this.availableTechnologies = xorBy(this.selectedTechnologies, this.availableTechnologies);
  }

}
