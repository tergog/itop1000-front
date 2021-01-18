import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentMethod } from '@stripe/stripe-js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaymentService } from 'app/shared/services/payment.service';

@Component({
  selector: 'app-delete-billing-method-dialog',
  templateUrl: './delete-billing-method-dialog.component.html',
  styleUrls: ['./delete-billing-method-dialog.component.scss']
})
export class DeleteBillingMethodDialogComponent implements OnInit, OnDestroy {

  public paymentMethod: PaymentMethod;
  public errorMessage: string;
  public ngUnsubscribe$ = new Subject<void>();

  constructor(private paymentService: PaymentService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteBillingMethodDialogComponent>) { }

  ngOnInit(): void {
    this.paymentMethod = this.data.paymentMethod;
  }

  deletePaymentMethod(paymentMethodId) {
    this.paymentService.deletePaymentMethod(paymentMethodId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        () => this.dialogRef.close(),
        error => this.errorMessage = error.message);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
