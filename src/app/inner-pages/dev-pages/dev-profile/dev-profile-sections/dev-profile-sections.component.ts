import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';
import { NotificationsService, UserService } from 'app/shared/services';
import { NameValueModel, UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';

import { EDevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';
import { slideInAnimation } from 'app/shared/animations';

@Component({
  selector: 'app-dev-profile-sections',
  templateUrl: './dev-profile-sections.component.html',
  styleUrls: ['./dev-profile-sections.component.scss'],
  animations: [slideInAnimation]
})
export class DevProfileSectionsComponent implements OnInit {

  @Input() public section: EDevProfileSections;

  public DevProfileSections = EDevProfileSections;

  constructor() { }

  ngOnInit(): void {}
}
