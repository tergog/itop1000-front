import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddBillingMethodDialogComponent } from '../../../shared/components/add-billing-method-dialog/add-billing-method-dialog.component';
import { PaymentService } from '../../../../shared/services/payment.service';

@Component({
  selector: 'app-client-billings',
  templateUrl: './client-billings.component.html',
  styleUrls: ['./client-billings.component.scss']
})
export class ClientBillingsComponent implements OnInit {

  public billingMethods: any = [];

  constructor(private matDialog: MatDialog,
              private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getPaymentMethods();
  }

  public onAddClick(): void {
    const dialogRef =  this.matDialog.open(AddBillingMethodDialogComponent);

    dialogRef.afterClosed() .subscribe((newBillingMethods) => {
      if (newBillingMethods) {
        this.billingMethods = newBillingMethods;
      }
    })
  }

  public getPaymentMethods(): void  {
    this.paymentService.getPaymentMethods()
      .subscribe(
        (billingsMethods) => {
            this.billingMethods = billingsMethods;
        },
        ({error}) => console.log(error)
      );
  }
}


