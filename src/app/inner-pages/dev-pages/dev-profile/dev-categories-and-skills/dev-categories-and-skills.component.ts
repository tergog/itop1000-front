import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { EDevProfileSectionNames } from 'app/inner-pages/dev-pages/dev-profile/shared/enums/devProfileSectionNames';
import * as fromCore from 'app/core/reducers';
import * as fromDev from 'app/core/developers/store';
import { DevelopersService } from 'app/shared/services';
import { getDeveloperCategories, getDeveloperSkills } from 'app/core/developers/store/developers.actions'

@Component({
  selector: 'app-dev-categories-and-skills',
  templateUrl: './dev-categories-and-skills.component.html',
  styleUrls: ['./dev-categories-and-skills.component.scss']
})
export class DevCategoriesAndSkillsComponent implements OnInit, OnDestroy {

  public isEdit: boolean;
  public DevProfileSectionNames = EDevProfileSectionNames;

  constructor(
    private store: Store<fromCore.State>,
    private developerService: DevelopersService,
    private storeDev: Store<fromDev.State>
  ) { }

  ngOnInit(): void {
    this.store.select(fromCore.getUserInfo).pipe(first())
    .subscribe((userInfo) => {
      this.isEdit = !userInfo.devProperties.skills?.length && !userInfo.devProperties.categories?.length;
    });

    this.developerService.getDeveloperCategories().pipe(
      first()
    ).subscribe(value => this.storeDev.dispatch(getDeveloperCategories(value)));

    this.developerService.getDeveloperSkills().pipe(
      first()
    ).subscribe(value => this.storeDev.dispatch(getDeveloperSkills(value)));
  }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  ngOnDestroy(): void {

  }
}
