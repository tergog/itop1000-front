import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import xorBy from 'lodash.xorby';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { NameValueModel, UserInfo, Developer } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { getDeveloper } from 'app/core/reducers/index';

@Component({
  selector: 'app-dev-work-experience',
  templateUrl: './dev-work-experience.component.html',
  styleUrls: ['./dev-work-experience.component.scss']
})
export class DevWorkExperienceComponent implements OnInit {

  public isEdit: boolean;
  public developer$: Observable<Developer>;

  public selectedTechnologies = [];
  public availableTechnologies: NameValueModel[] = [
    { name: 'Javascript', value: 1 },
    { name: 'Typescript', value: 2 },
    { name: 'CSS3', value: 3 },
    { name: 'HTML5', value: 5 },
    { name: 'AngularJS', value: 6 },
    { name: 'Angular 9', value: 7 },
    { name: 'Angular 10', value: 8 },
    { name: 'Angular 7', value: 9 },
    { name: 'Angular 8', value: 10 },
    { name: 'Angular 2+', value: 11 },
  ];

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService) {}

  ngOnInit(): void {
    this.developer$ = this.store.select(getDeveloper);
    this.updateTechnologies([]);
  }

  // ngOnInit(): void {
  //   this.store.select(fromCore.getUserInfo)
  //     .pipe(first())
  //     .subscribe((userInfo: UserInfo) => {
  //       if (userInfo.token) {
  //         userInfo = this.devProfileService.decodeToken(userInfo.token);
  //       }
  //       this.updateCategoriesAndSkills(userInfo);
  //     }
  //     );
  // }

  public onCancelClick() {
    console.log('cancel');
  }

  public onTechnologyRemove(technology: NameValueModel): void {
    this.selectedTechnologies = this.selectedTechnologies.filter(item => item.value !== technology.value);
    this.availableTechnologies.push(technology);
  }

  public onSaveClick(): void {
    // this.devProfileService.onSaveClick(this.availableTechnologies);
    this.isEdit = false;
  }

  private updateTechnologies(technologies) {
    this.selectedTechnologies = [ ...technologies ] || [];

    this.availableTechnologies = xorBy(this.selectedTechnologies, this.availableTechnologies);
  }
}
