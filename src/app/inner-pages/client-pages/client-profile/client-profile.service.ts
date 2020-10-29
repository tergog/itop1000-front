import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '../../../core/reducers';
import { NotificationsService, UserService } from '../../../shared/services';
import { UserInfo } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { TOKEN } from '../../../constants/constants';
import * as coreActions from '../../../core/actions/core.actions';
import * as jwtDecode from 'jwt-decode';

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
