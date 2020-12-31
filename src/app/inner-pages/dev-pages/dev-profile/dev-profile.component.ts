import { Component, OnInit } from '@angular/core';

import { EDevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './dev-profile.component.html',
  styleUrls: ['./dev-profile.component.scss']
})
export class DevProfileComponent implements OnInit {

  public selectedSection: EDevProfileSections = EDevProfileSections.ContactInfo;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onSectionSelect(selectedSection: EDevProfileSections): void {
    this.selectedSection = selectedSection;
  }

}
