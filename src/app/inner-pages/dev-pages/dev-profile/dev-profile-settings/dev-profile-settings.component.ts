import { UserInfo } from 'app/shared/models';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first } from 'rxjs/operators';

import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { UserService, NotificationsService } from 'app/shared/services';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dev-profile-settings',
  templateUrl: './dev-profile-settings.component.html',
  styleUrls: ['./dev-profile-settings.component.scss']
})
export class DevProfileSettingsComponent implements OnInit {

  public form: FormGroup;
  public imageUrl: string;
  public isEdit: boolean;

  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
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
      .subscribe((image: string) => this.uploadImage(image))
  }


  public onCancelClick(): void {
  }

  public onSaveClick(): void {
    const formData: Partial<UserInfo> = {};
    const controlKeys = Object.keys(this.form.controls);
    for (const key of controlKeys) {
      if (this.form.controls[key].dirty) {
        formData[key] = this.form.controls[key].value;
      }
    }
    this.userService.updateProfile(formData).pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(),
        ({ error }) => this.handleErrorResponse(error)
      );
    this.disableEmptyFields();
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

  private handleSuccessResponse(): void {
    this.isEdit = false;
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: 'success'
    });
  }

  private handleErrorResponse(error) {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }

}
