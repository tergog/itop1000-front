import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { untilDestroyed } from "ngx-take-until-destroy";
import { MatDialog } from "@angular/material/dialog";

import { PaymentService } from "app/shared/services/payment.service";
import { UpdateBillingMethodDialogComponent } from "app/inner-pages/shared/components/update-billing-method-dialog/update-billing-method-dialog.component";

@Component({
  selector: 'app-billing-method',
  templateUrl: './billing-method.component.html',
  styleUrls: ['./billing-method.component.scss']
})
export class BillingMethodComponent implements OnInit, OnDestroy {

  @Input() paymentMethod: any;
  @Output() onMethodChanged = new EventEmitter();

  constructor(private paymentService: PaymentService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteClick(paymentMethodId: string): void {
    this.paymentService.deletePaymentMethod(paymentMethodId)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.onMethodChanged.emit(),
        error => console.log(error))
  }

  onEditClick(paymentMethodId) {
    const dialogRef =  this.matDialog.open(UpdateBillingMethodDialogComponent, {data: {paymentMethod: this.paymentMethod}});

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.onMethodChanged.emit());
  }

  ngOnDestroy(): void { }

}
