import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethod } from '@stripe/stripe-js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaymentService } from 'app/shared/services/payment.service';
import { UpdateBillingMethodDialogComponent } from 'app/inner-pages/shared/components/update-billing-method-dialog/update-billing-method-dialog.component';
import { DeleteBillingMethodDialogComponent } from 'app/inner-pages/shared/components/delete-billing-method-dialog/delete-billing-method-dialog.component';

@Component({
  selector: 'app-billing-method',
  templateUrl: './billing-method.component.html',
  styleUrls: ['./billing-method.component.scss']
})
export class BillingMethodComponent implements OnInit, OnDestroy {

  @Input() paymentMethod: PaymentMethod;
  @Output() onMethodChanged = new EventEmitter();

  public ngUnsubscribe$ = new Subject<void>();

  constructor(private paymentService: PaymentService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteClick(): void {
    const deleteDialogRef = this.matDialog.open(DeleteBillingMethodDialogComponent, { data: { paymentMethod: this.paymentMethod }});

    deleteDialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.onMethodChanged.emit());
  }

  onEditClick() {
    const dialogRef =  this.matDialog.open(UpdateBillingMethodDialogComponent, { data: { paymentMethod: this.paymentMethod }});

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.onMethodChanged.emit());
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
