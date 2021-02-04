import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';
import { UserInfo, UserLoginInfo, UserRegistrationInfo } from 'app/shared/models';
import { TOKEN } from 'app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;
  private id: string;

  constructor(private http: HttpClient) {
    this.id = jwtDecode(localStorage.getItem(TOKEN)).id;
  }

  public registerVerifyEmail(email: string): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.email.isAvailable}${email}`, {});
  }

  public getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}${ApiConstants.accounts}/${this.id}`);
  }

  public registerIsEmailAvailable(email: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}${ApiConstants.email.isAvailable}${email}`, {})
      .pipe(map(res => !!res));
  }

  public verifyToken(token: string): Observable<object> {
    return this.http.post(`${environment.apiUrl}${ApiConstants.auth.verifyToken}`, { token });
  }

  public userRegistration(userInfo: UserRegistrationInfo): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.auth.register}/`, userInfo);
  }

  public userLogin(userInfo: UserLoginInfo): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.auth.login}`, userInfo)
      .pipe(tap((res: any) => this.id = jwtDecode(res.token).id));
  }

  public updateProfile(userInfo: Partial<UserInfo>): Observable<object> {
    return this.http.patch(`${this.apiUrl}${ApiConstants.accounts}/${this.id}`, userInfo);
  }

  public uploadPhoto(image: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts}/${this.id}/photo`, { image });
  }

  public isValidSession() {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      return this.http.post(`${this.apiUrl}${ApiConstants.auth.verifyToken}`, { token });
    }
    return of(false);
  }

  public changePassword({ oldPassword, password }): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.auth.changePassword}`, { oldPassword, password });
  }

  public uploadCertificate(image: string | ArrayBuffer): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}${ApiConstants.accounts}/${this.id}/certificate`, {image});
  }

  public deleteCertificate(url: string, index: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}${ApiConstants.accounts}/${this.id}/certificate`, {url, index});
  }

}
