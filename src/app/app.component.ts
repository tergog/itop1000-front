import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { merge, Observable } from 'rxjs';


import { NotificationMessage } from 'app/shared/models';
import { NotificationsService } from 'app/shared/services/notifications.service';
import { getClientLoading, getDevelopersLoading, State } from './core/reducers/index';
import { delay, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ITOP1000';
  public notification: NotificationMessage;
  isLoading$: Observable<boolean>;
  isLoading: boolean;

  constructor(private notificationService: NotificationsService, private store: Store<State>) {
    this.isLoading$ = merge(
      this.store.select(getDevelopersLoading),
      this.store.select(getClientLoading)
    ).pipe(
      startWith(null),
      delay(0),
      tap(res => console.log(res))
    );
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
