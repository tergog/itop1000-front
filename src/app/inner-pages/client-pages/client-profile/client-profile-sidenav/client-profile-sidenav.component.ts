import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EClientProfileSections } from 'app/inner-pages/client-pages/client-profile/client-profile-sections.enum';
import { SelectedSection } from 'app/inner-pages/dev-pages/dev-profile/profile-sidenav/profile-sidenav.component';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './client-profile-sidenav.component.html',
  styleUrls: ['./client-profile-sidenav.component.scss']
})
export class ClientProfileSidenavComponent implements OnInit {

  @Output() section = new EventEmitter<EClientProfileSections>();

  public ClientProfileSections = EClientProfileSections;
  public activeSection: EClientProfileSections = EClientProfileSections.ContactInfo;
  public selectedSection: SelectedSection = { title: 'Contact info', icon: 'contact-info' };

  constructor() { }

  ngOnInit(): void {
  }

  public onSectionCLick(selectedSection: EClientProfileSections, selectedTitle: string, selectedIcon: string): void {
    this.selectedSection = { title: selectedTitle, icon: selectedIcon };
    this.activeSection = selectedSection;
    this.section.emit(selectedSection);
  }

}
