import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Job } from 'app/shared/models';
import { TOKEN } from 'app/constants/constants';
import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  apiUrl = environment.apiUrl;
  id: string;

  constructor(private http: HttpClient) {
    try {
      this.id = jwtDecode(localStorage.getItem(TOKEN)).id;
    } catch (err) {
      localStorage.clear();
    }
  }

  public getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}${ApiConstants.jobs}`);
  }

  public searchJobs(searchTerm: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}${ApiConstants.jobsSearch}?searchTerm=${searchTerm}`);
  }

  public findJob(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}${ApiConstants.jobs}/${id}`);
  }

  public createJob(jobData): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.jobs}`, { ...jobData, userId: this.id });
  }

  public deleteJob(jobId: string): Observable<object> {
    return this.http.delete(`${this.apiUrl}${ApiConstants.jobs}/${jobId}`);
  }

  public updateJob(jobId: string, jobData: Job): Observable<Job> {
    return this.http.patch<Job>(`${this.apiUrl}${ApiConstants.jobs}/${jobId}`, jobData);
  }

  public applyDevToJob(jobId: string, userId: string): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.jobsApply}`, { jobId, userId });
  }
}
