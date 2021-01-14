import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as jwtDecode from 'jwt-decode';
import { first } from 'rxjs/operators';

import { marginAnimation } from 'app/shared/animations/margin.animation';
import { Notification } from 'app/shared/models/notification2.model';
import { NotificationsService, UserService } from 'app/shared/services';
import { State } from 'app/core/reducers/index';
import { TOKEN } from 'app/constants/constants';
import * as coreActions from 'app/core/actions/core.actions';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';

@Component({
  selector: 'app-notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss'],
  animations: [marginAnimation]
})

export class NotificationsPopupComponent implements OnInit {

  @Input() notifications: Notification[];

  constructor(private userService: UserService, private store: Store<State>, private notificationService: NotificationsService) { }

  ngOnInit(): void {
  }

  delete(i: number): void {
    const newArr: Notification[] = [...this.notifications];
    newArr.splice(i, 1);
    this.userService.updateProfile({ notifications: newArr })
      .pipe(first())
      .subscribe(
        ({ token }: any) => this.handleSuccessResponse(token),
        ({ error }) => this.handleErrorResponse(error)
      );
  }

  handleSuccessResponse(token: string): void {
    localStorage.setItem(TOKEN, token);
    const userInfo = jwtDecode(token);
    this.store.dispatch(new coreActions.UpdateUserProfileAction(userInfo));
  }

  handleErrorResponse(error): void {
    this.notificationService.message.emit({ message: error, type: ENotificationStatus.Error });
  }

  identify(index, item){
    return item.message;
  }
}
