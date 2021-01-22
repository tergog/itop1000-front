import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';
import { UserService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { DevProperties } from 'app/shared/models/dev-properties.model';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';
import * as fromDevelopers from 'app/core/developers/store';

@Injectable()
export class DevProfileService {

  public devProperties: DevProperties;

  constructor(
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private userService: UserService,
    private developersStore: Store<fromDevelopers.State>,
  ) {}

  public onSaveClick(userInfo: Partial<UserInfo>): void {

    this.userService.updateProfile(userInfo)
      .pipe(first())
      .subscribe(
        (user: UserInfo) => this.handleSuccessResponse(user),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  public getStaticData(data: string) {
    return this.developersStore.select(fromDevelopers[`get${data}`], )
      .pipe(
        filter(res => !!res.length),
        first()
      );
  }

  public onUploadPhoto(image: string): void {
    this.userService.uploadPhoto(image)
      .pipe(first())
      .subscribe(
        (token) => {
          this.notificationsService.message.emit({
            message: 'Photo added successfully',
            type: ENotificationStatus.Success
          });
          this.onUpdateProfileInfo(token);
        },
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  public onUploadCertificate(certificate: string): void {
    this.userService.uploadCertificate(certificate)
      .pipe(first())
      .subscribe(
        (token) => {
          this.notificationsService.message.emit({
            message: 'Certificate added successfully',
            type: ENotificationStatus.Success
          });
          this.onUpdateProfileInfo(token);
        },
        ({error}) => this.handleErrorResponse(error)
      );
  }

  public onDeleteCertificate(certificate: string, index: number): void {
    this.userService.deleteCertificate(certificate, index)
      .pipe(first())
      .subscribe(
        (token) => {
          this.notificationsService.message.emit({
            message: 'Certificate deleted successfully',
            type: ENotificationStatus.Success
          });
          this.onUpdateProfileInfo(token);
        },
        ({error}) => this.handleErrorResponse(error)
      );
  }

  private onUpdateProfileInfo(token: string) {

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
