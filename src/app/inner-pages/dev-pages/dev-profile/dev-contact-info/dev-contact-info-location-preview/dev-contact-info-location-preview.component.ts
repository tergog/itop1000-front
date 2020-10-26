import {Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';

@Component({
  selector: 'app-dev-contact-info-location-preview',
  templateUrl: './dev-contact-info-location-preview.component.html',
  styleUrls: ['./dev-contact-info-location-preview.component.scss']
})
export class DevContactInfoLocationPreviewComponent implements OnInit {

  @Input() userInfo: UserInfo;

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit(): void {
  }

}
