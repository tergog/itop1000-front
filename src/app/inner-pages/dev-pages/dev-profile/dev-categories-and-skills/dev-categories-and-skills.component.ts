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

  constructor() { }

  ngOnInit(): void {}

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

}
