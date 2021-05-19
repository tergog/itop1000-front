import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EDevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.scss']
})
export class ProfileSidenavComponent implements OnInit {

  @Output() section = new EventEmitter<EDevProfileSections>();

  public DevProfileSections = EDevProfileSections;
  // public activeSection: EDevProfileSections = EDevProfileSections.ContactInfo;

  constructor() { }

  ngOnInit(): void {
  }

  public onSectionCLick(selectedSection: EDevProfileSections): void {
    // this.activeSection = selectedSection;
    this.section.emit(selectedSection);
  }

}
