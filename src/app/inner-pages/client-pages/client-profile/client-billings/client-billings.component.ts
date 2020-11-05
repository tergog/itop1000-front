import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { untilDestroyed } from "ngx-take-until-destroy";

import { AddBillingMethodDialogComponent } from 'app/inner-pages/shared/components/add-billing-method-dialog/add-billing-method-dialog.component';
import { PaymentService } from 'app/shared/services/payment.service';

@Component({
  selector: 'app-client-billings',
  templateUrl: './client-billings.component.html',
  styleUrls: ['./client-billings.component.scss']
})
export class ClientBillingsComponent implements OnInit, OnDestroy {

  public billingMethods: any = [];
  public errorMessage: string;

  constructor(private matDialog: MatDialog,
              private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getPaymentMethods();
  }

  public onAddClick(): void {
    const dialogRef =  this.matDialog.open(AddBillingMethodDialogComponent);

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.getPaymentMethods());
  }

  public getPaymentMethods(): void  {
    this.paymentService.getPaymentMethods()
      .pipe(untilDestroyed(this))
      .subscribe((billingsMethods) => this.billingMethods = billingsMethods,
        ({error}) => this.errorMessage = error.message
      );
  }

  ngOnDestroy(): void { }
}


