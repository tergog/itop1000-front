import { Component, Input, OnInit } from '@angular/core';

import { UserInfo } from 'app/shared/models';

@Component({
  selector: 'app-client-contact-info-preview',
  templateUrl: './client-contact-info-preview.component.html',
  styleUrls: ['./client-contact-info-preview.component.scss']
})
export class ClientContactInfoPreviewComponent implements OnInit {

  @Input() userInfo: UserInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
