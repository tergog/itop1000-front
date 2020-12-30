import { Component, OnInit } from '@angular/core';

import { EClientProfileSections } from 'app/inner-pages/client-pages/client-profile/client-profile-sections.enum';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

  public selectedSection: EClientProfileSections = EClientProfileSections.ContactInfo;

  constructor() { }

  ngOnInit(): void {
  }

  public onSectionSelect(selectedSection: EClientProfileSections): void {
    this.selectedSection = selectedSection;
  }

}
