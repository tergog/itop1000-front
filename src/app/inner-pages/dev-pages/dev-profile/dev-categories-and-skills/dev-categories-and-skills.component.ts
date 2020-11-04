import { Component, OnInit } from '@angular/core';

import { DevProfileSectionNames } from 'app/inner-pages/dev-pages/dev-profile/shared/enums/devProfileSectionNames';


@Component({
  selector: 'app-dev-categories-and-skills',
  templateUrl: './dev-categories-and-skills.component.html',
  styleUrls: ['./dev-categories-and-skills.component.scss']
})
export class DevCategoriesAndSkillsComponent implements OnInit {

  public isEdit: boolean;
  public DevProfileSectionNames = DevProfileSectionNames;

  constructor() { }

  ngOnInit(): void {}

  public onEditClick(): void {
    this.isEdit = !this.isEdit;
  }

}
