import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import { UserService, UtilsService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import { TOKEN } from 'app/constants/constants';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public errorMessage: string;
  public isPasswordHidden = true;

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void { }

  public onLogInClick(): void {
    this.userService.userLogin(this.form.value)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.loginSuccess(userInfo),
        ({ error }) => this.errorMessage = error.message
      );
  }

  public passwordHiddenToggle(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  private loginSuccess(userInfo: UserInfo): void {
    this.errorMessage = '';
    localStorage.setItem(TOKEN, userInfo.token);
    if (jwtDecode(userInfo.token).role === 'Dev') {
      this.router.navigate(['in/d/profile']);
    } else if (jwtDecode(userInfo.token).role === 'Client') {
      this.router.navigate(['in/c/profile']);
    }

  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        this.utilsService.emailValidator(),
        this.utilsService.specialCharacterValidator(),
        Validators.maxLength(40)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.utilsService.passwordCombinationValidator()
      ])
    });
  }
}
