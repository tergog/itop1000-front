import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NotificationMessage } from 'app/shared/models';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notification', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(400px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateX(400px)' }))
      ])
    ])
  ]
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
