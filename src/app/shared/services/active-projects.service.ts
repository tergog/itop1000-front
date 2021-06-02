import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';
import {ActiveProject, Job} from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getActiveProjects(id: string): Observable<ActiveProject> {
    // return this.http.get<ActiveProject>(`${this.apiUrl}${ApiConstants.accounts}/${id}`);
    const project = this.http.get<ActiveProject>(`${this.apiUrl}${ApiConstants.accounts}/${id}`);
    console.log(project.subscribe(data => console.log(data)))
    return project
  }

  public getProjectApplications(id: string): Observable<Job> {
    const project = this.http.get<Job>(`${this.apiUrl}${ApiConstants.accounts}/${id}`);
    console.log(project.subscribe(data => console.log(data)))
    return project
  }

  public setProjects(project: ActiveProject): Observable<ActiveProject> {
    return this.http.post<ActiveProject>(`${this.apiUrl}${ApiConstants.projectApplications}`, project);
  }
}
