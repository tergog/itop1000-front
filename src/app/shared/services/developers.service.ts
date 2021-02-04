import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';
import { Developer, NameValueModel } from 'app/shared/models';
import { TOKEN } from 'app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {
  apiUrl = environment.apiUrl;
  id: string;

  constructor(private http: HttpClient) {
    this.id = jwtDecode(localStorage.getItem(TOKEN)).id;
  }

  public getDeveloper(id: string): Observable<Developer> {
    return this.http.get<Developer>(`${this.apiUrl}${ApiConstants.accounts}/${id}`);
  }

  public searchDevelopers(searchTerm: string): Observable<Developer[]> {
    return this.http.get<Developer[]>(`${this.apiUrl}${ApiConstants.accountsSearch}?searchTerm=${searchTerm}`);
  }

  public uploadProjectImage(image: string | ArrayBuffer, projectId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}${ApiConstants.accounts}/${this.id}/projects/${projectId}/image`, {image});
  }

  public getDeveloperCategories(): Observable<NameValueModel[]> {
    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.data.developerCategories}`);
  }

  public getDeveloperSkills(): Observable<NameValueModel[]> {
    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.data.developerSkills}`);
  }

  public getDeveloperSoftSkills(): Observable<NameValueModel[]> {
    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.data.developerSoftSkills}`);
  }

  public getDeveloperLanguages(): Observable<NameValueModel[]> {
    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.data.developerLanguages}`);
  }
}
