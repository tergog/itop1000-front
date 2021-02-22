import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DevProject } from 'app/shared/models/dev-project.model';
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';


import { environment } from 'environments/environment';
import { TOKEN } from 'app/constants/constants';
import { ApiConstants } from 'app/constants/api.constants';
import { ImgResponse } from 'app/shared/models/uploadImgResponse';

@Injectable({
  providedIn: 'root'
})
export class DevProjectsService {
  apiUrl = environment.apiUrl;
  id: string;

  constructor(private http: HttpClient) {
    try {
      this.id = jwtDecode(localStorage.getItem(TOKEN)).id;
    } catch (err) {
      localStorage.clear();
    }
  }

  public create(project: DevProject): Observable<DevProject> {
    return this.http.post<DevProject>(`${this.apiUrl}${ApiConstants.projects}`, { ...project, userId: this.id} );
  }

  public getProjects(): Observable<DevProject[]> {
    return this.http.get<DevProject[]>(`${this.apiUrl}${ApiConstants.projects}`);
  }

  public update(project: DevProject): Observable<DevProject> {
    return this.http.patch<DevProject>(`${this.apiUrl}${ApiConstants.projects}/${project.id}`, project);
  }

  public uploadImage(image: FormData): Observable<ImgResponse> {
    return this.http.post<ImgResponse>(`${this.apiUrl}${ApiConstants.projects}/image`, image);
  }

  public uploadLogo(image: FormData): Observable<ImgResponse> {
    return this.http.post<ImgResponse>(`${this.apiUrl}${ApiConstants.projects}/logo`, image);
  }

  public getProjectsById(id: string): Observable<DevProject[]> {
    return this.http.get<DevProject[]>(`${ this.apiUrl }${ ApiConstants.projects }/${ id }`);
  }

  public getProjectById(id: string): Observable<DevProject> {
    return this.http.get<DevProject>(`${ this.apiUrl }${ ApiConstants.projects }/project/${ id }`);
  }

}
