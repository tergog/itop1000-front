import { Component, Input, OnInit } from '@angular/core';

import { EDevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';
import { slideInAnimation } from 'app/shared/animations';

@Component({
  selector: 'app-dev-profile-sections',
  templateUrl: './dev-profile-sections.component.html',
  styleUrls: ['./dev-profile-sections.component.scss'],
  animations: [slideInAnimation]
})
export class DevProfileSectionsComponent implements OnInit {

  @Input() public section: EDevProfileSections;

  public DevProfileSections = EDevProfileSections;

  constructor() { }

  ngOnInit(): void {}
}
