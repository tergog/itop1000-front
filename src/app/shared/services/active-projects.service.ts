import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { ApiConstants } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getActiveProjects(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${ApiConstants.accounts.activeProjects}/${id}`);
  }
}
