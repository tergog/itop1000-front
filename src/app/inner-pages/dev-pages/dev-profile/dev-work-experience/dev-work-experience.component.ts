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
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedTechnologies = [];
  public availableTechnologies = [];

  constructor(
    private store: Store<fromCore.State>,
    private devProfileService: DevProfileService) {}

  ngOnInit(): void {
    this.developer$ = this.store.select(getDeveloper);
    this.developer$.subscribe((developer) => this.availableTechnologies = developer.projects[0].technologies);
    this.updateTechnologies(this.availableTechnologies);
  }

  // constructor(
  //   private store: Store<fromCore.State>,
  //   private devProfileService: DevProfileService
  // ) { }

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

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  public onCategoryRemove(category: NameValueModel): void {
    this.selectedTechnologies = this.selectedTechnologies.filter(item => item.value !== category.value);
    this.availableTechnologies.push(category);
  }

  public onCategorySelect({ option }): void {
    this.availableTechnologies = this.availableTechnologies.filter(category => category.value !== option.value.value);
    this.selectedTechnologies.push(option.value);
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
