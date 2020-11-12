import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromCore from 'app/core/reducers';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { UserService } from 'app/shared/services';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';

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
    private devProfileService: DevProfileService,
    private userService: UserService,
    private matDialog: MatDialog,
    private store: Store<fromCore.State>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo);
  }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  public openUploadPhotoDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      destination: 'Profile'
    };

    this.matDialog.open(UploadPhotoDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(
        filter(result => !!result),
        first()
      )
      .subscribe((image: string) => this.uploadImage(image));
  }


  public onCancelClick(): void {}

  public onSaveClick(): void {
    this.disableEmptyFields();
    this.devProfileService.onSaveClick(this.form.value);
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
      );
  }

}
