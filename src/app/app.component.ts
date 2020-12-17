import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

import { NotificationMessage } from 'app/shared/models';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { UserService } from './shared/services';
import { first, map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromCore from 'app/core/reducers';
import * as coreActions from 'app/core/actions/core.actions';
import * as jwtDecode from 'jwt-decode';
import { TOKEN } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ITOP1000';
  public notification: NotificationMessage;

  constructor(private notificationService: NotificationsService) {
    
  }

  ngOnInit(): void {
    this.subscribeForNotifications();
  }

  public onCloseNotification(): void {
    this.notification = null;
  }

  /**
   * Subscription for app notifications
   */
  private subscribeForNotifications(): void {
    this.notificationService.message
      .subscribe((message: NotificationMessage) => {
        this.notification = message;
      });
  }
}
