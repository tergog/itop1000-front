import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { xorBy } from 'lodash.xorby';
import * as jwtDecode from 'jwt-decode';

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

  @Input() project: DevProject;

  constructor(
    private notificationsService: NotificationsService,
    private userService: UserService,
    // private devProfileService: DevProfileService,
    private store: Store<fromCore.State>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo)
    .pipe(first())
    .subscribe((userInfo: UserInfo) => {
      if (userInfo.token) {
        userInfo = this.decodeToken(userInfo.token);
        }
        this.updateTechnologies(this.selectedTechnologies);
      });
  }

  private initForm() {
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

  onEditClick() {
    this.isEdit = !this.isEdit;
  }

  onCancelClick() {
    this.isEdit = !this.isEdit;
  }

  onSaveClick(userInfo: Partial<UserInfo>) {
    this.disableEmptyFields();
    this.userService.updateProfile(userInfo)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(userInfo),
        ({ error }) => this.handleErrorResponse(error)
      );

    this.isEdit = false;
    // this.devProfileService.onSaveClick(this.form.value);
  }

  public onTechnologySelect({ option }): void {
    this.availableTechnologies = this.availableTechnologies.filter(technology => technology.value !== option.value.value);
    this.selectedTechnologies.push(option.value);
  }

  public onTechnologyRemove(technology: NameValueModel): void {
    this.selectedTechnologies = this.selectedTechnologies.filter(item => item.value !== technology.value);
    this.availableTechnologies.push(technology);
  }

  private updateTechnologies(technologies) {
    this.selectedTechnologies = [ ...technologies ] || [];

    this.availableTechnologies = xorBy(this.selectedTechnologies, this.availableTechnologies);
  }

  private onUpdateProfileInfo(userInfo) {
    this.store.dispatch(new coreActions.SetTokenOnProfileUpdateAction(userInfo));
    localStorage.setItem(TOKEN, userInfo.token);
  }

  public decodeToken(token = localStorage.getItem(TOKEN)) {
    const userInfo = jwtDecode(token);
    this.store.dispatch(new coreActions.UpdateUserProfileAction(userInfo));
    return userInfo;
  }

  private handleSuccessResponse(userInfo): void {
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: 'success'
    });
    this.onUpdateProfileInfo(userInfo);
  }

  private handleErrorResponse(error) {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }
}
