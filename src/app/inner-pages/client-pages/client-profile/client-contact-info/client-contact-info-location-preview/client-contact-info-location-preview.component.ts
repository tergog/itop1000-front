import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from 'app/shared/models';

@Component({
  selector: 'app-client-contact-info-location-preview',
  templateUrl: './client-contact-info-location-preview.component.html',
  styleUrls: ['./client-contact-info-location-preview.component.scss']
})
export class ClientContactInfoLocationPreviewComponent implements OnInit {

  @Input() userInfo: UserInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
