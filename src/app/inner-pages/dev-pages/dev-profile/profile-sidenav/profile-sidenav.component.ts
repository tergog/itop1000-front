import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EDevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';

export interface SelectedSection {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.scss']
})
export class ProfileSidenavComponent implements OnInit {

  @Output() section = new EventEmitter<EDevProfileSections>();

  public DevProfileSections = EDevProfileSections;
  public activeSection: EDevProfileSections = EDevProfileSections.AccountInfo;
  public selectedSection: SelectedSection = { title: 'Account info', icon: 'contact-info' };

  constructor() { }

  ngOnInit(): void {
  }

  public onSectionCLick(selectedSection: EDevProfileSections, selectedTitle: string, selectedIcon: string): void {
    this.selectedSection = { title: selectedTitle, icon: selectedIcon };
    this.activeSection = selectedSection;
    this.section.emit(selectedSection);
  }

}
