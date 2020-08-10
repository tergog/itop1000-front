import { Component, Input, OnInit } from '@angular/core';

import { UserInfo } from 'app/shared/models';

@Component({
  selector: 'app-dev-contact-info-preview',
  templateUrl: './dev-contact-info-preview.component.html',
  styleUrls: ['./dev-contact-info-preview.component.scss']
})
export class DevContactInfoPreviewComponent implements OnInit {

  @Input() userInfo: UserInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
