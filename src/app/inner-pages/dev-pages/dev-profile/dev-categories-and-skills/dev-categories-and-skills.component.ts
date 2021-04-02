import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { EDevProfileSectionNames } from 'app/inner-pages/dev-pages/dev-profile/shared/enums/devProfileSectionNames';
import * as fromCore from 'app/core/reducers';
import { getUserInfo } from 'app/core/reducers';

@Component({
  selector: 'app-dev-categories-and-skills',
  templateUrl: './dev-categories-and-skills.component.html',
  styleUrls: ['./dev-categories-and-skills.component.scss']
})
export class DevCategoriesAndSkillsComponent implements OnInit, OnDestroy {

  public userInfo$ = this.store.select(getUserInfo);
  public isEdit: boolean;
  public DevProfileSectionNames = EDevProfileSectionNames;

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit(): void {
    this.store.select(fromCore.getUserInfo).pipe(
      first()
    )
      .subscribe((userInfo) => {
        this.isEdit = !userInfo.devProperties?.skills?.length && !userInfo.devProperties?.categories?.length;
      });
  }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

  ngOnDestroy(): void {}

  editToggle(): void {
    this.isEdit = !this.isEdit;
  }
}
