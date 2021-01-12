import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';
import { UserService } from 'app/shared/services';
import { UserInfo, NameValueModel } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import * as fromDevelopers from 'app/core/developers/store/index';
import { DevProperties } from 'app/shared/models/dev-properties.model';
import { NotificationsService } from 'app/shared/services/notifications.service';

@Injectable()
export class DevProfileService {

  public devProperties: DevProperties;

  public selectedCategories: NameValueModel[] = [];
  public selectedSkills: NameValueModel[] = [];
  public selectedSoftSkills: NameValueModel[] = [];
  public selectedLanguages: NameValueModel[] = [];

  public availableCategories: NameValueModel[];
  public availableSkills: NameValueModel[];
  public availableSoftSkills: NameValueModel[];
  public availableLanguages: NameValueModel[];

  constructor(
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private userService: UserService,
    private developersStore: Store<fromDevelopers.State>
  ) {
    this.developersStore.select(fromDevelopers.getCategories)
      .pipe(
        map(val => val.filter(
          category => !this.selectedCategories.find(
            selectedCat => selectedCat.value === category.value)
        )))
      .subscribe(val => this.availableCategories = val);
    this.developersStore.select(fromDevelopers.getSkills)
      .pipe(
        map(val => val.filter(
          skill => !this.selectedSkills.find(
            selectedSkill => selectedSkill.value === skill.value)
        )))
      .subscribe(val => this.availableSkills = val);
  }

  public onSaveClick(userInfo: Partial<UserInfo>): void {

    this.userService.updateProfile(userInfo)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(userInfo),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  private onUpdateProfileInfo(token: string): void {

    localStorage.setItem(TOKEN, token);

    const userInfo = jwtDecode(token);
    this.store.dispatch(new coreActions.UpdateUserProfileAction(userInfo));
  }

  private handleSuccessResponse(userInfo: UserInfo): void {
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: 'success'
    });
    this.onUpdateProfileInfo(userInfo.token);
  }

  private handleErrorResponse(error: Error): void {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }
}
