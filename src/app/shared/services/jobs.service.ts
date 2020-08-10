import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';
import { Job } from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}${ApiConstants.jobs.main}`)
  }

  public searchJobs(searchTerm: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}${ApiConstants.jobs.search}?searchTerm=${searchTerm}`)
  }

  public createJob(jobData): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.jobs.main}`, jobData)
  }
}
