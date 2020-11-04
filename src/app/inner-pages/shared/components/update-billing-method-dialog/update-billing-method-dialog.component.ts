import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { PaymentService } from 'app/shared/services/payment.service';

@Component({
  selector: 'app-update-billing-method-dialog',
  templateUrl: './update-billing-method-dialog.component.html',
  styleUrls: ['./update-billing-method-dialog.component.scss']
})
export class UpdateBillingMethodDialogComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public errorMessage: string;
  public name: string;
  public firstName: string;
  public lastName: string;

  constructor(private paymentService: PaymentService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UpdateBillingMethodDialogComponent>) { }

  ngOnInit(): void {
    this.initForm();
    this.name = this.data.paymentMethod.billing_details.name;
    this.firstName = this.name.split(' ')[0];
    this.lastName = this.name.split(' ')[1];
  }

  private initForm(): void {
    this.form = new FormGroup({

      firstName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      }),

      lastName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      }),
    });
  }

  updateMethod(): void {
    const firstNameInput = this.form.value['firstName'] ? this.form.value['firstName'] : this.firstName;
    const lastNameInput = this.form.value['lastName'] ? this.form.value['lastName'] : this.lastName;

    if(firstNameInput == this.firstName && lastNameInput == this.lastName) {
      return;
    }

    const paymentMethodData = {
      id: this.data.paymentMethod.id,
      billing_details: {
        name: `${firstNameInput} ${lastNameInput}`
      }
    }

    this.paymentService.updatePaymentMethod(paymentMethodData)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => this.dialogRef.close(),
        error => this.errorMessage = error.message);
  }

  ngOnDestroy(): void {}
}
