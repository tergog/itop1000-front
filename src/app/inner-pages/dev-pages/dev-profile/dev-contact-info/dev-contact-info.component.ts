import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

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

  constructor(
    private userService: UserService,
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService
    ) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(fromCore.getUserInfo);
  }

  public editToggle(): void {
    this.isEdit = !this.isEdit;
  }

  public onSaveClick(userInfo: Partial<UserInfo>): void {
    this.userService.updateProfile(userInfo)
      .pipe(first())
      .subscribe(
        (userInfo: UserInfo) => this.handleSuccessResponse(),
        ({ error }) => this.handleErrorResponse(error)
      )
  }

  private handleSuccessResponse(): void {
    this.isEdit = false;
    this.notificationsService.message.emit({
      message: 'Profile updated successfully',
      type: 'success'
    });
  }

  private handleErrorResponse(error) {
    this.notificationsService.message.emit({
      message: error.message,
      type: 'error'
    });
  }
}
