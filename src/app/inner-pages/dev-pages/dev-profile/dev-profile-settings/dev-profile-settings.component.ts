import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
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
export class DevProfileSettingsComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public isEdit: boolean;
  public ngUnsubscribe$ = new Subject<any>();

  constructor(
    private devProfileService: DevProfileService,
    private userService: UserService,
    private matDialog: MatDialog,
    private store: Store<fromCore.State>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.store.select(fromCore.getUserInfo)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((user) => this.form && user ? this.form.patchValue(user) : null
    );
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
      .subscribe((image: FormData) => this.uploadImage(image));
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
      title: new FormControl('', []),
      address: new FormControl('', []),
      phone: new FormControl('', []),
      email: new FormControl('', []),
      timezone: new FormControl('', []),
      photo: new FormControl('')
    });
  }

  private disableEmptyFields(): void {
    Object.keys(this.form.controls).forEach(field => {
      return this.form.controls[field].value || this.form.controls[field].disable();
    });
  }

  private uploadImage(image: FormData): void {
    this.devProfileService.onUploadPhoto(image);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

}
