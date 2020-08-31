import { Store } from '@ngrx/store';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import * as jwtDecode from 'jwt-decode';
import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';
import { NotificationsService, UserService } from 'app/shared/services';
import { NameValueModel, UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';

import { DevProfileSections } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.enum';
import { slideInAnimation } from 'app/shared/animations';

@Component({
  selector: 'app-dev-profile-sections',
  templateUrl: './dev-profile-sections.component.html',
  styleUrls: ['./dev-profile-sections.component.scss'],
  animations: [slideInAnimation]
})
export class DevProfileSectionsComponent implements OnInit {

  @Input() public section: DevProfileSections;
  @Output() updateProfileInfo = new EventEmitter();

  public DevProfileSections = DevProfileSections;

  constructor(
    private store: Store<fromCore.State>
  ) { }

  ngOnInit(): void {
  }

  onUpdateProfileInfo(userInfo) {
    this.store.dispatch(new coreActions.SetTokenOnProfileUpdateAction(userInfo));
    localStorage.setItem(TOKEN, userInfo.token);
  }

}
