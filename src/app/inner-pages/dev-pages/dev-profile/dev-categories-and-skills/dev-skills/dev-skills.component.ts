import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { CategoriesAndSkills } from 'app/shared/models/categories-and-skills.model';

@Component({
  selector: 'app-dev-skills',
  templateUrl: './dev-skills.component.html',
  styleUrls: ['./dev-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevSkillsComponent implements OnInit {

  @Input() skills: CategoriesAndSkills[];


  constructor() { }

  ngOnInit(): void {
    console.log(this.skills);
  }

}
