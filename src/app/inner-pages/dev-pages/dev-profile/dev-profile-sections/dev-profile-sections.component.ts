import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
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
    private store: Store<fromCore.State>,
    private userService: UserService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {}

  public onSaveClick(userInfo) {
    this.userService.updateProfile(userInfo)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(userInfo),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  public onUpdateProfileInfo(userInfo: UserInfo): void {
    this.store.dispatch(new coreActions.SetTokenOnProfileUpdateAction(userInfo));
    localStorage.setItem(TOKEN, userInfo.token);
  }

  // todo: set and decode token in the same method

  public decodeToken(token = localStorage.getItem(TOKEN)): UserInfo {
    const userInfo = jwtDecode(token);
    this.store.dispatch(new coreActions.UpdateUserProfileAction(userInfo));
    return userInfo;
  }

  public handleSuccessResponse(userInfo: UserInfo): void {
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: 'success'
    });
    this.updateProfileInfo.emit(userInfo);
  }

  public handleErrorResponse(error: Error): void {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }

}
