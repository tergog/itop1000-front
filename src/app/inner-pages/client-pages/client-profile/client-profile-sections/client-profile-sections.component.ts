import { Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { EClientProfileSections } from 'app/inner-pages/client-pages/client-profile/client-profile-sections.enum';

@Component({
  selector: 'app-client-profile-sections',
  templateUrl: './client-profile-sections.component.html',
  styleUrls: ['./client-profile-sections.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, position: 'absolute', width: '100%', top: '-5px' }),
        animate('300ms ease-in', style({ opacity: 1, position: 'absolute', width: '100%', top: 0 }))
      ])
    ])
  ]
})
export class ClientProfileSectionsComponent implements OnInit {

  @Input() public section: EClientProfileSections;
  public ClientProfileSections = EClientProfileSections;

  constructor() { }

  ngOnInit(): void {
  }

}
