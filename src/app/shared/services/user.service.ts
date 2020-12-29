import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as crypto from 'crypto-js';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';
import { UserInfo, UserLoginInfo, UserRegistrationInfo } from 'app/shared/models';
import { TOKEN } from 'app/constants/constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public registerVerifyEmail(email: string): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts.verifyEmail}${email}`, {});
  }

  public registerIsEmailAvailable(email: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts.isEmailAvailable}${email}`, {})
      .pipe(map(res => !!res));
  }

  public verifyToken(token: string): Observable<object> {
    return this.http.post(`${environment.apiUrl}${ApiConstants.accounts.verifyEmail}`, { token });
  }

  private customEncrypt(value: string): string {
    value = crypto.AES.encrypt(value, '1542156').toString();
    value = btoa(value);
    value = crypto.AES.encrypt(value, '4256171').toString();
    value = value.split('').reverse().join('');
    return value;
  }

  public userRegistration(userInfo: UserRegistrationInfo): Observable<object> {
    if(userInfo.password = userInfo.confirmPassword) {
      userInfo.password = this.customEncrypt(userInfo.password);
      userInfo.confirmPassword = userInfo.password;
      return this.http.post(`${this.apiUrl}${ApiConstants.accounts.register}/`, userInfo);
    }
  }

  public userLogin(userInfo: UserLoginInfo): Observable<object> {
    userInfo.password = this.customEncrypt(userInfo.password);
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts.authenticate}`, userInfo);
  }

  public updateProfile(userInfo: Partial<UserInfo>): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts.updateProfile}`, userInfo);
  }

  public uploadPhoto(image: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts.upload}`, { image });
  }

  public isValidSession() {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      return this.http.post(`${this.apiUrl}${ApiConstants.accounts.verifyToken}`, { token });
    }
    return of(false);
  }

  public changePassword({ oldPassword, password }): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts.changePassword}`, { oldPassword, password });
  }
}
