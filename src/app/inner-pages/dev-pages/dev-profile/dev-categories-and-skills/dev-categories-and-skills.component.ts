import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import xorBy from 'lodash.xorby';

import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { NameValueModel, UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';

@Component({
  selector: 'app-dev-categories-and-skills',
  templateUrl: './dev-categories-and-skills.component.html',
  styleUrls: ['./dev-categories-and-skills.component.scss']
})
export class DevCategoriesAndSkillsComponent implements OnInit {

  public isEdit: boolean;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedCategories: NameValueModel[] = [];
  public selectedSkills: NameValueModel[] = [];

  public availableCategories: NameValueModel[] = [
    { name: 'Web Development', value: 1 },
    { name: 'Software Development', value: 2 },
    { name: 'Mobile Development', value: 3 },
    { name: 'Ecommerce Development', value: 5 },
    { name: 'Information Security', value: 6 },
    { name: 'Game Development', value: 7 },
  ];

  public availableSkills: NameValueModel[] = [
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
    private devProfileService: DevProfileService
  ) { }

  ngOnInit(): void {
    this.store.select(fromCore.getUserInfo)
      .pipe(first())
      .subscribe((userInfo: UserInfo) => {
        if (userInfo.token) {
          userInfo = this.devProfileService.decodeToken(userInfo.token);
        }
        this.updateCategoriesAndSkills(this.devProfileService.devProperties);
      }
      );
  }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  public onCategoryRemove(category: NameValueModel): void {
    this.selectedCategories = this.selectedCategories.filter(item => item.value !== category.value);
    this.availableCategories.push(category);
  }

  public onCategorySelect({ option }): void {
    this.availableCategories = this.availableCategories.filter(category => category.value !== option.value.value);
    this.selectedCategories.push(option.value);
  }

  public onSkillRemove(category: NameValueModel): void {
    this.selectedSkills = this.selectedSkills.filter(item => item.value !== category.value);
    this.availableSkills.push(category);
  }

  public onSkillSelect({ option }): void {
    this.availableSkills = this.availableSkills.filter(category => category.value !== option.value.value);
    this.selectedSkills.push(option.value);
  }

  public onSaveClick(): void {
    this.devProfileService.devProperties = { skills: this.selectedSkills, categories: this.selectedCategories }
    this.devProfileService.onSaveClick({ devProperties: this.devProfileService.devProperties });
    this.isEdit = false;
  }

  private updateCategoriesAndSkills(devProperties) {
    this.selectedCategories = [ ...devProperties.categories ] || [];
    this.selectedSkills = [ ...devProperties.skills ] || [];

    this.availableCategories = xorBy(this.selectedCategories, this.availableCategories, 'name');
    this.availableSkills = xorBy(this.selectedSkills, this.availableSkills, 'name');
  }
}
