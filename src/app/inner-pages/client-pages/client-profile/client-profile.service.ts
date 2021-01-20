import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import { NotificationsService, UserService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import { TOKEN } from 'app/constants/constants';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';
import * as coreActions from 'app/core/actions/core.actions';
import * as fromCore from 'app/core/reducers';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {

  constructor(
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private userService: UserService
  ) { }

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
      type: ENotificationStatus.Success
    });
    this.onUpdateProfileInfo(userInfo.token);
  }

  private handleErrorResponse(error: Error): void {
    this.notificationsService.message.emit({
      message: error.message,
      type: ENotificationStatus.Error
    });
  }
}
