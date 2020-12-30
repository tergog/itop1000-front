import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EClientProfileSections } from 'app/inner-pages/client-pages/client-profile/client-profile-sections.enum';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './client-profile-sidenav.component.html',
  styleUrls: ['./client-profile-sidenav.component.scss']
})
export class ClientProfileSidenavComponent implements OnInit {

  @Output() section = new EventEmitter<EClientProfileSections>();

  public ClientProfileSections = EClientProfileSections;
  public activeSection: EClientProfileSections = EClientProfileSections.ContactInfo;

  constructor() { }

  ngOnInit(): void {
  }

  public onSectionCLick(selectedSection: EClientProfileSections): void {
    this.activeSection = selectedSection;
    this.section.emit(selectedSection);
  }

}
