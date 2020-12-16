import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  EntityCollectionDataService,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams,
  HttpMethods,
  DefaultDataServiceConfig
} from '@ngrx/data';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from 'app/shared/models/job.model';
import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';

@Injectable()
export class JobDataService extends DefaultDataService<Job> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger, defaultDataServiceConfig: DefaultDataServiceConfig) {
    super('Job', http, httpUrlGenerator, defaultDataServiceConfig);
    logger.log('Created custom Job EntityDataService');
  }
  apiUrl = environment.apiUrl;

  protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
    url = `${this.apiUrl}${ApiConstants.jobs.main}`;
    console.log(url);
    console.log(method);
    console.log(data);
    return super.execute(method, url, data, options);
  }

  

  getById(id: any): Observable<Job>{
    console.log(id);
    return this.execute('GET', `${this.apiUrl}${ApiConstants.jobs.search}/${id}`);
  }

  search(str: String): Observable<Job[]>{
    return this.http.get<Job[]>(`${this.apiUrl}${ApiConstants.jobs.search}?searchTerm=${str}`);
  }
  
}