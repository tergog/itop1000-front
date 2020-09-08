import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';
import { UserService } from 'app/shared/services';
import { UserInfo, NameValueModel } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { DevProperties } from 'app/shared/models/dev-properties.model';
import { NotificationsService } from 'app/shared/services/notifications.service';

@Injectable()
export class DevProfileService {

  public devProperties: DevProperties;

  public selectedCategories: NameValueModel[] = [];
  public selectedSkills: NameValueModel[] = [];
  public selectedSoftSkills: NameValueModel[] = [];
  public selectedLanguages: NameValueModel[] = [];

  public availableCategories: NameValueModel[] = [
    { name: 'Web Development', value: 1 },
    { name: 'Software Development', value: 2 },
    { name: 'Mobile Development', value: 3 },
    { name: 'Ecommerce Development', value: 5 },
    { name: 'Information Security', value: 6 },
    { name: 'Game Development', value: 7 },
  ];

  public availableSkills: NameValueModel[] = [
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

  public availableSoftSkills: NameValueModel[] = [
    { name: 'Communication', value: 1 },
    { name: 'Teamwork', value: 2 },
    { name: 'Creativity', value: 3 },
    { name: 'Problem Solving', value: 5 },
    { name: 'Time Management', value: 6 },
    { name: 'Negotiating', value: 9 },
    { name: 'Responsibility', value: 10 },
    { name: 'Leadership', value: 11 },
  ];

  public availableLanguages: NameValueModel[] = [
    { name: 'Russian', value: 1 },
    { name: 'Ukrainian', value: 2 },
    { name: 'English', value: 3 },
    { name: 'Spanish', value: 5 },
    { name: 'French', value: 6 },
  ];

  constructor(
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private userService: UserService
  ) { }

  public initUpdateProfileService(): void {
    this.store.select(fromCore.getUserInfo)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => {
          if (userInfo.token) {
            userInfo = this.decodeToken(userInfo.token);
          }
        }
      );
  }

  public onSaveClick(userInfo: Partial<UserInfo>): void {
    this.userService.updateProfile(userInfo)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(userInfo),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  private onUpdateProfileInfo(userInfo): void {
    this.store.dispatch(new coreActions.SetTokenOnProfileUpdateAction(userInfo));
    localStorage.setItem(TOKEN, userInfo.token);
  }

  // todo: set and decode token in same method
  // todo: use set and decode token method same as in on login

  public decodeToken(token = localStorage.getItem(TOKEN)): UserInfo {
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

  private handleErrorResponse(error): void {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }
}
