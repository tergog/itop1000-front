import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {first, map, switchMap, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUserInfo, State } from 'app/core/reducers/index';

import { GetPaidNowDialogComponent } from 'app/inner-pages/shared/components/get-paid-now-dialog/get-paid-now-dialog.component';
import { PaymentService } from 'app/shared/services/payment.service';
import { UserInfo } from 'app/shared/models/user-info.model';
import { BankAccountDialogComponent } from '../../../shared/components/bank-account-dialog/bank-account-dialog.component';
import { NotificationsService } from '../../../../shared/services';
import { NotificationMessage } from 'app/shared/models';


@Component({
  selector: 'app-dev-profile-balance',
  templateUrl: './dev-profile-balance.component.html',
  styleUrls: ['./dev-profile-balance.component.scss']
})
export class DevProfileBalanceComponent implements OnInit, OnDestroy {

  userInfo$: Observable<UserInfo>;

  constructor(private matDialog: MatDialog, private paymentService: PaymentService, private store: Store<State>, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select(getUserInfo);
  }

  onGetClick(): void {
    //const dialogRef = this.matDialog.open(GetPaidNowDialogComponent);
    //dialogRef.afterClosed()
    //  .pipe(untilDestroyed(this))
    //  .subscribe(res => console.log(res));
    this.paymentService.payout().subscribe(
      res => {

      },
      error => {
        this.notificationService.message.emit({ message: error.error.raw.message, type: 'error' });
      }
    );
  }

  onVerify(): void {
    this.paymentService.verifyStripeAccount().pipe(
      first(),
      map((res: any) => res.accountLinks.url),
      tap(res => window.location.href = res)
    ).subscribe();
  }

  onConnect(): void {
    const dialogRef = this.matDialog.open(BankAccountDialogComponent);
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  public onEditClick(): void {}

  ngOnDestroy(): void {}

}
