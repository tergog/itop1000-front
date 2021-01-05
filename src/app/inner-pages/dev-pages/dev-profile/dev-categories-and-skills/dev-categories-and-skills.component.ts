import { Component, OnInit } from '@angular/core';

import { DevProfileSectionNames } from 'app/inner-pages/dev-pages/dev-profile/shared/enums/devProfileSectionNames';
import { DevelopersService } from '../../../../shared/services';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setDeveloperCategories, setDeveloperSkills } from 'app/core/developers/developers.actions';
import * as fromDevelopers from 'app/core/developers/index';

@Component({
  selector: 'app-dev-categories-and-skills',
  templateUrl: './dev-categories-and-skills.component.html',
  styleUrls: ['./dev-categories-and-skills.component.scss']
})
export class DevCategoriesAndSkillsComponent implements OnInit {

  public isEdit: boolean;
  public DevProfileSectionNames = DevProfileSectionNames;


  constructor(
    private store: Store<fromDevelopers.State>,
    private developersService: DevelopersService
  ) { }

  ngOnInit(): void {
    this.developersService.getDeveloperCategories()
      .pipe(first())
      .subscribe(
        (data) => this.store.dispatch(setDeveloperCategories(data)),
        ({ error }) => console.log(error)
      );
    this.developersService.getDeveloperSkills()
      .pipe(first())
      .subscribe(
        (data) => this.store.dispatch(setDeveloperSkills(data)),
        ({ error }) => console.log(error)
      );
  }

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

}
