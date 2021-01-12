import { Component, OnInit } from '@angular/core';

import { NotificationMessage } from 'app/shared/models';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { opacityInOutAnimation } from 'app/shared/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [opacityInOutAnimation]
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
