import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { UtilsService, UserService, NotificationsService } from 'app/shared/services';
import { NotificationMessage } from 'app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { TermsPagesComponent } from 'app/core/components/terms-pages/terms-pages.component';
import { termsData, privacyData } from 'app/constants/terms-pages-data';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;
  public role = 'Role';
  public termsData = termsData;
  public privacyData = privacyData;


  public passwordFirst = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      this.utilsService.passwordCombinationValidator(),
    ]
  });

  public passwordSecond = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      this.utilsService.passwordCombinationValidator(),
      this.utilsService.passwordMatchValidator(this.passwordFirst),
    ]
  });

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private notificationsService: NotificationsService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  selectRole(event: any): void {
    if (event === 'Client') {
      this.initClientForm();
    } else if (event === 'Dev') {
      this.initDevForm();
    }
  }

  private initClientForm(): void {
    this.form = new FormGroup({
      title: new FormControl('Mr.', [Validators.required]),
      companyName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        this.utilsService.emailValidator(),
        this.utilsService.specialCharacterValidator(),
        Validators.maxLength(40)
      ]),
      password: this.passwordFirst,
      confirmPassword: this.passwordSecond,
      acceptTerms: new FormControl(null, [Validators.required])
    });
  }

  private initDevForm(): void {
    this.form = new FormGroup({
      title: new FormControl('Mr.', [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        this.utilsService.emailValidator(),
        this.utilsService.specialCharacterValidator(),
        Validators.maxLength(40)
      ]),
      password: this.passwordFirst,
      confirmPassword: this.passwordSecond,
      acceptTerms: new FormControl(null, [Validators.required])
    });
  }

  onSignUpClick(): void {
    this.userService.userRegistration({ ...this.form.value, role: this.role })
      .pipe(first())
      .subscribe(
        (res: NotificationMessage) => this.handleUserRegistrationSuccessResponse(res),
        (err: HttpErrorResponse) => this.handleUserRegistrationErrorResponse(err)
      );
  }

  private handleUserRegistrationSuccessResponse(res: NotificationMessage): void {
    this.router.navigate(['/auth', 'login']).then(() => {
      res.type = 'success';
      this.notificationsService.message.emit(res);
    });
  }

  private handleUserRegistrationErrorResponse({ message }): void {
    this.notificationsService.message.emit({
      message,
      type: 'error'
    });
  }

  showDialog(dialog: object): void {
    const dialogRef = this.dialog.open(TermsPagesComponent, {
      height: '800px',
      width: '1400px',
      data: dialog
    });
  }

}
