import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import * as coreActions from 'app/core/actions/core.actions';
import { TOKEN } from 'app/constants/constants';
import { UserService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import { NotificationsService } from 'app/shared/services/notifications.service';

@Component({
  selector: 'app-dev-contact-info',
  templateUrl: './dev-contact-info.component.html',
  styleUrls: ['./dev-contact-info.component.scss']
})
export class DevContactInfoComponent implements OnInit {

  public userInfo$: Observable<UserInfo>;

  public isEdit: boolean;

  @Output() updateProfileInfo = new EventEmitter();

  constructor(
    private userService: UserService,
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService
    ) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
    this.store.select(fromCore.getUserInfo)
      .pipe(first())
      .subscribe((userInfo: UserInfo) => {
        if (userInfo.token) {
          userInfo = this.decodeToken(userInfo.token);
        }
      }
    );
  }

  public editToggle(): void {
    this.isEdit = !this.isEdit;
  }

  public onSaveClick(userInfo: Partial<UserInfo>): void {
    this.userService.updateProfile(userInfo)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(userInfo),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  public decodeToken(token = localStorage.getItem(TOKEN)) {
    const userInfo = jwtDecode(token);
    this.store.dispatch(new coreActions.UpdateUserProfileAction(userInfo));
    return userInfo;
  }

  private handleSuccessResponse(userInfo): void {
    // if (userInfo.token) {
    //   userInfo = this.decodeToken(userInfo.token);
    // }
    this.isEdit = false;
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: 'success'
    });
    this.updateProfileInfo.emit(userInfo);
  }

  private handleErrorResponse(error) {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }

}
