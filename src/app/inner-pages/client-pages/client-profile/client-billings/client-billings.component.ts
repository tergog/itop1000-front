import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethod } from '@stripe/stripe-js';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AddBillingMethodDialogComponent } from 'app/inner-pages/shared/components/add-billing-method-dialog/add-billing-method-dialog.component';
import { PaymentService } from 'app/shared/services/payment.service';

@Component({
  selector: 'app-client-billings',
  templateUrl: './client-billings.component.html',
  styleUrls: ['./client-billings.component.scss']
})
export class ClientBillingsComponent implements OnInit, OnDestroy {

  public billingMethods: PaymentMethod[] = [];
  public errorMessage: string;
  public ngUnsubscribe$ = new Subject<void>();

  constructor(private matDialog: MatDialog,
              private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getPaymentMethods();
  }

  public onAddClick(): void {
    const dialogRef =  this.matDialog.open(AddBillingMethodDialogComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.getPaymentMethods());
  }

  public getPaymentMethods(): void  {
    this.paymentService.getPaymentMethods()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((billingsMethods) => this.billingMethods = billingsMethods.data,
        ({ error }) => this.errorMessage = error.message
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}


