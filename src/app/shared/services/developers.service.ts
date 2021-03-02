import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';
import { Developer, NameValueModel } from 'app/shared/models';
import { TOKEN } from 'app/constants/constants';
import { CategoriesAndSkills } from 'app/shared/models/categories-and-skills.model';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {
  apiUrl = environment.apiUrl;
  id: string;
  categories: CategoriesAndSkills[] = [
    {
      title: 'Web, Mobile & Software Development',
      value: [
        { name: 'Web Development', value: 1 },
        { name: 'Software Development', value: 2 },
        { name: 'Ecommerce Development', value: 5 },
        { name: 'Mobile Development', value: 3 },
        { name: 'Game Development', value: 7 }
      ]
    },
    {
      title: 'IT & Networking',
      value: [
        { name: 'Information Security', value: 6 }
      ]
    }
  ];
  skills: CategoriesAndSkills[] = [
    {
      title: 'Web, Mobile & Software Development',
      value: [
        { name: 'Javascript', value: 1 },
        { name: 'Typescript', value: 2 },
        { name: 'HTML5', value: 5 },
        { name: 'AngularJS', value: 6 },
        { name: 'Angular 10', value: 8 },
        { name: 'Angular 7', value: 9 },
        { name: 'Angular 8', value: 10 },
        { name: 'Angular 2+', value: 11 },
        { name: 'Angular 9', value: 7 },
        { name: 'CSS3', value: 3 }
      ]
    }
  ];

  constructor(private http: HttpClient) {
    try {
      this.id = jwtDecode(localStorage.getItem(TOKEN)).id;
    } catch (err) {
      localStorage.clear();
    }
  }

  public getDeveloper(id: string): Observable<Developer> {
    return this.http.get<Developer>(`${this.apiUrl}${ApiConstants.accounts}/${id}`);
  }

  public searchDevelopers(searchTerm: string): Observable<Developer[]> {
    return this.http.get<Developer[]>(`${this.apiUrl}${ApiConstants.accountsSearch}?searchTerm=${searchTerm}`);
  }

  public uploadProjectImage(image: FormData, projectId: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}${ApiConstants.accounts}/${this.id}/projects/${projectId}/image`, image);
  }

  public getDeveloperCategories(): Observable<CategoriesAndSkills[]> {
    return of(this.categories);
  }

  public getDeveloperSkills(): Observable<CategoriesAndSkills[]> {
    return of(this.skills);
  }

  public getDeveloperSoftSkills(): Observable<NameValueModel[]> {
    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.data.developerSoftSkills}`);
  }

  public getDeveloperLanguages(): Observable<NameValueModel[]> {
    return this.http.get<NameValueModel[]>(`${this.apiUrl}${ApiConstants.data.developerLanguages}`);
  }
}
