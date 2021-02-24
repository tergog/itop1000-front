import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, first, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as coreActions from 'app/core/actions/core.actions';
import { UserService } from 'app/shared/services';
import { NameValueModel, UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { DevProperties } from 'app/shared/models/dev-properties.model';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';
import * as fromDevelopers from 'app/core/developers/store';
import { AddCertificateAction, DeleteCertificateAction, UpdatePhotoAction, } from 'app/core/actions/core.actions';

@Injectable()
export class DevProfileService {

  public devProperties: DevProperties;

  constructor(
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private userService: UserService,
    private developersStore: Store<fromDevelopers.State>
  ) {}

  public onSaveClick(userInfo: Partial<UserInfo>): void {
    this.userService.updateProfile(userInfo)
      .pipe(first())
      .subscribe(
        (user: UserInfo) => this.handleSuccessResponse(user),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  public getStaticData(data: string): Observable<NameValueModel[]> {
    return this.developersStore.select(fromDevelopers[`get${data}`], );
  }

  public onUploadPhoto(image: FormData): void {
    this.userService.uploadPhoto(image)
      .pipe(
        first(),
      ).subscribe(res => {
        this.showSuccessMessage('Photo added successfully');
        this.store.dispatch(new UpdatePhotoAction(res.photo));
      },
      error => {
        this.handleErrorResponse(error);
      });
  }

  private showSuccessMessage(message: string): void {
    this.notificationsService.message.emit({
      'message': message,
      type: ENotificationStatus.Success
    });
  }

  public onUploadCertificate(certificate: FormData): void {
    this.userService.uploadCertificate(certificate)
      .pipe(
        first(),
        catchError(err => of(this.handleErrorResponse(err)))
      ).subscribe(res => {
        this.store.dispatch(new AddCertificateAction(res.certificate));
        this.showSuccessMessage('Certificate added successfully');
    });
  }

  public onDeleteCertificate(certificate: string, index: number): void {
    this.userService.deleteCertificate(certificate, index)
      .pipe(
        first(),
        catchError(err => of(this.handleErrorResponse(err)))
      ).subscribe(res => {
        this.showSuccessMessage('Certificate deleted successfully');
        this.store.dispatch(new DeleteCertificateAction(res.deletedCertificate));
    });
  }

  private onUpdateProfileInfo(userInfo: UserInfo) {
    this.store.dispatch(new coreActions.UpdateUserProfileAction(userInfo));
  }

  private handleSuccessResponse(userInfo: UserInfo): void {
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: ENotificationStatus.Success
    });
    this.onUpdateProfileInfo(userInfo);
  }

  private handleErrorResponse(error: Error): void {
    this.notificationsService.message.emit({
      message: error.message,
      type: ENotificationStatus.Error
    });
  }
}
