import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from 'app/core/reducers';

import { DevProfileSectionNames } from 'app/inner-pages/dev-pages/dev-profile/shared/enums/devProfileSectionNames';

@Component({
  selector: 'app-dev-categories-and-skills',
  templateUrl: './dev-categories-and-skills.component.html',
  styleUrls: ['./dev-categories-and-skills.component.scss']
})
export class DevCategoriesAndSkillsComponent implements OnInit {

  public isEdit: boolean;
  public DevProfileSectionNames = DevProfileSectionNames;

  constructor(private store: Store<fromCore.State>) { }

  ngOnInit(): void {
    this.store.select(fromCore.getUserInfo).subscribe((userInfo) => {
      if (!userInfo.devProperties.skills.length && !userInfo.devProperties.categories.length) {
        this.isEdit = true;
      }
    });
  }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

}
