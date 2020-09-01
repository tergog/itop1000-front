import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as jwtDecode from 'jwt-decode';

import * as coreActions from 'app/core/actions/core.actions';
import * as fromCore from 'app/core/reducers';
import { TOKEN } from 'app/constants/constants';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { UserService, NotificationsService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';

@Component({
  selector: 'app-dev-profile-settings',
  templateUrl: './dev-profile-settings.component.html',
  styleUrls: ['./dev-profile-settings.component.scss']
})
export class DevProfileSettingsComponent implements OnInit {

  public form: FormGroup;
  public imageUrl: string;
  public isEdit: boolean;

  @Output() updateProfileInfo = new EventEmitter();

  constructor(
    private store: Store<fromCore.State>,
    private userService: UserService,
    private notificationsService: NotificationsService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
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

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  public openUploadPhotoDialog(): void {
    this.matDialog.open(UploadPhotoDialogComponent)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        first()
      )
      .subscribe((image: string) => this.uploadImage(image));
  }


  public onCancelClick(): void {
  }

  public onSaveClick(userInfo: Partial<UserInfo>): void {
    this.disableEmptyFields();

    this.userService.updateProfile(this.form.value)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(userInfo),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  private initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
      address: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', []),
      timezone: new FormControl('', [])
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

  private uploadImage(image: string): void {
    this.userService.uploadPhoto(image)
      .pipe(first())
      .subscribe(
        ({ url }) => this.imageUrl = url,
        ({ error }) => console.log(error.message)
      )
  }

  public decodeToken(token = localStorage.getItem(TOKEN)) {
    const userInfo = jwtDecode(token);
    this.store.dispatch(new coreActions.UpdateUserProfileAction(userInfo));
    return userInfo;
  }

  private handleSuccessResponse(userInfo): void {
    this.isEdit = false;
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: 'success'
    });
    this.updateProfileInfo.emit(userInfo);
  }

  private handleErrorResponse(error) {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }

}
