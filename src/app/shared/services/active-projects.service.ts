import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';
import { ActiveProject } from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getActiveProjects(id: string): Observable<ActiveProject> {
    return this.http.get<ActiveProject>(`${this.apiUrl}${ApiConstants.accounts}/${id}`);
  }
}
