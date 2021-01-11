import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NotificationMessage } from 'app/shared/models';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  /** message to show */
  @Input() notification: NotificationMessage;
  /** notification closed output event */
  @Output() notificationClosed = new EventEmitter();
  /** show notification message by default time */
  public defaultTimeout = 5000;
  NotificationStatus = ENotificationStatus;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.notificationClosed.emit();
    }, this.defaultTimeout);
  }

  /**
   * Notification closed
   */
  onNotificationClose(): void {
    this.notificationClosed.emit();
  }
}
