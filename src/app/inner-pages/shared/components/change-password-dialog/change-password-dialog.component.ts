import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, UtilsService } from 'app/shared/services';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordFirst: FormControl;
  public passwordSecond: FormControl;
  public errorMessage: string;

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private utilsService: UtilsService,
    private userService: UserService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.passwordFirst = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.utilsService.passwordCombinationValidator(),
      ]
    });

    this.passwordSecond = new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.utilsService.passwordCombinationValidator(),
        this.utilsService.passwordMatchValidator(this.passwordFirst),
      ]
    });

    this.form = new FormGroup({
      oldPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          this.utilsService.passwordCombinationValidator(),
        ],
      }),
      password: this.passwordFirst,
      confirmPassword: this.passwordSecond,
    })
  }

  public closeDialog(): void {
    this.userService.changePassword(this.form.value)
      .pipe(first())
      .subscribe(
        () => this.changePasswordResponse(),
        ({ error }) => this.errorMessage = error.message
      )
  }

  private changePasswordResponse(): void {
    this.notificationsService.message.emit({
      message: 'Password changed successfully',
      type: ENotificationStatus.Success
    });

    this.dialogRef.close();
  }

}
