import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NameValueModel } from 'app/shared/models';
import { CategoriesAndSkills } from 'app/shared/models/categories-and-skills.model';

@Component({
  selector: 'app-dev-categories',
  templateUrl: './dev-categories.component.html',
  styleUrls: ['./dev-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevCategoriesComponent implements OnInit {

  @Input() categories: CategoriesAndSkills[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.categories);
  }

}
