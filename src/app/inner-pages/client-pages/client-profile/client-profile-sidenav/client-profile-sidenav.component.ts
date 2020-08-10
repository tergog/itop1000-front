import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ClientProfileSections } from 'app/inner-pages/client-pages/client-profile/client-profile-sections.enum';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './client-profile-sidenav.component.html',
  styleUrls: ['./client-profile-sidenav.component.scss']
})
export class ClientProfileSidenavComponent implements OnInit {

  @Output() section = new EventEmitter<ClientProfileSections>();

  public ClientProfileSections = ClientProfileSections;
  public activeSection: ClientProfileSections = ClientProfileSections.ContactInfo;

  constructor() { }

  ngOnInit(): void {
  }

  public onSectionCLick(selectedSection: ClientProfileSections): void {
    this.activeSection = selectedSection;
    this.section.emit(selectedSection);
  }

}
