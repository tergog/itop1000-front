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

  public getDevelopers(): Observable<Developer[]> {
    return this.http.get<Developer[]>(`${this.apiUrl}${ApiConstants.developers.main}`)
  }

  public searchDevelopers(searchTerm: string): Observable<Developer[]> {
    return this.http.get<Developer[]>(`${this.apiUrl}${ApiConstants.developers.search}?searchTerm=${searchTerm}`)
  }
}
