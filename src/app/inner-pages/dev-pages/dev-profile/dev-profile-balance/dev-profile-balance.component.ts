import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { PaymentService } from 'app/shared/services/payment.service';
import { UserInfo } from 'app/shared/models/user-info.model';
import { getUserInfo, State } from 'app/core/reducers/index';
import { NotificationsService } from 'app/shared/services';
import { BankAccountDialogComponent } from 'app/inner-pages/shared/components/bank-account-dialog/bank-account-dialog.component';


@Component({
  selector: 'app-dev-profile-balance',
  templateUrl: './dev-profile-balance.component.html',
  styleUrls: ['./dev-profile-balance.component.scss']
})
export class DevProfileBalanceComponent implements OnInit, OnDestroy {

  userInfo$: Observable<UserInfo>;

  constructor(private matDialog: MatDialog,
              private paymentService: PaymentService,
              private store: Store<State>,
              private notificationService: NotificationsService) { }

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
      map((link: any) => link.accountLinks.url),
      tap((link: string) => window.location.href = link)
    ).subscribe();
  }

  onConnect(): void {
    const dialogRef = this.matDialog.open(BankAccountDialogComponent);
    dialogRef.afterClosed().pipe(first()).subscribe();
  }

  public onEditClick(): void {}

  ngOnDestroy(): void {}

}
