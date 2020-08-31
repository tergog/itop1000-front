import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import xorBy from 'lodash.xorby';

import * as jwtDecode from 'jwt-decode';
import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';
import { NotificationsService, UserService } from 'app/shared/services';
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

  @Output() updateProfileInfo = new EventEmitter();

  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService,
    private store: Store<fromCore.State>
  ) { }

  ngOnInit(): void {
    this.store.select(fromCore.getUserInfo)
      .pipe(first())
      .subscribe((userInfo: UserInfo) => {
        if (userInfo.token) {
          userInfo = this.decodeToken(userInfo.token);
        }
        this.updateCategoriesAndSkills(userInfo);
      }
      );
  }

  public decodeToken(token = localStorage.getItem(TOKEN)) {
    // const token = localStorage.getItem(TOKEN);
    const userInfo = jwtDecode(token);
    this.store.dispatch(new coreActions.UpdateUserProfileAction(userInfo));
    return userInfo;
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
    this.userService.updateProfile({ skills: this.selectedSkills, categories: this.selectedCategories})
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(userInfo),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  private updateCategoriesAndSkills({ categories, skills }) {
    this.selectedCategories = [ ...categories ] || [];
    this.selectedSkills = [ ...skills ] || [];

    this.availableCategories = xorBy(this.selectedCategories, this.availableCategories, 'name');
    this.availableSkills = xorBy(this.selectedSkills, this.availableSkills, 'name');
  }

  private handleSuccessResponse(userInfo): void {
    this.isEdit = false;
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: 'success'
    });
    this.updateProfileInfo.emit(userInfo);
  }

  private handleErrorResponse(error) {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }
}
