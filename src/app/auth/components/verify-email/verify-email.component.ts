import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { first, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService, UtilsService } from 'app/shared/services';
import { UserInfo } from '../../../shared/models';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public errorMessage: string;

  constructor(
              private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      untilDestroyed(this),
      switchMap(({ token }) => this.userService.verifyToken(token))
    ).subscribe(() => {
      this.router.navigate(['/auth', 'login']);
    });

    this.initForm();
  }

  public onEmailSend(): void {
    this.userService.registerVerifyEmail(this.form.controls.email.value)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => console.log(userInfo),
        ({ error }) => this.errorMessage = error.message
      );
  }

  ngOnDestroy(): void { }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        this.utilsService.emailValidator(),
        this.utilsService.specialCharacterValidator(),
        Validators.maxLength(40)
      ]),
    });
  }

}
