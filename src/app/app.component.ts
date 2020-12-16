import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

import { NotificationMessage } from 'app/shared/models';
import { NotificationsService } from 'app/shared/services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ITOP1000';
  public notification: NotificationMessage;
  isView: boolean;

  constructor(private notificationService: NotificationsService, private router: Router, location: Location) {
    router.events.subscribe(val => {
      if(location.path() === "/auth/login" || location.path() === "/auth/signup") {
        this.isView = false;
      } else {
        this.isView = true;
      }
    });
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
