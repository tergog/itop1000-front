import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';
import { Developer } from 'app/shared/models';

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

  public uploadCertificate(image: string | ArrayBuffer): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}${ApiConstants.accounts.uploadCertificate}`, {image});
  }

  public deleteCertificate(url: string) {
    return this.http.post<string>(`${this.apiUrl}${ApiConstants.accounts.deleteCertificate}`, {url});
  }
}
