import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';
import {Developer, NameValueModel} from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getDeveloper(id: string): Observable<Developer> {
    return this.http.get<Developer>(`${this.apiUrl}${ApiConstants.accounts.getDeveloperById}/${id}`);
  }

  public searchDevelopers(searchTerm: string): Observable<Developer[]> {
    return this.http.get<Developer[]>(`${this.apiUrl}${ApiConstants.accounts.searchDevelopers}?searchTerm=${searchTerm}`);
  }

  public uploadProjectImage(image: string | ArrayBuffer): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}${ApiConstants.accounts.uploadProjectImage}`, {image});
  }

  public getDeveloperCategories(): Observable<NameValueModel[]> {

    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.accounts.developerCategories}`);
  }

  public getDeveloperSkills(): Observable<NameValueModel[]> {

    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.accounts.developerSkills}`);
  }

  public getDeveloperSoftSkills(): Observable<NameValueModel[]> {

    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.accounts.developerSoftSkills}`);
  }

  public getDeveloperLanguages(): Observable<NameValueModel[]> {

    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.accounts.developerLanguages}`);
  }


}
