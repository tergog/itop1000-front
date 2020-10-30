import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { MatDialogRef } from '@angular/material/dialog';
import { untilDestroyed } from "ngx-take-until-destroy";

import { UserService } from 'app/shared/services';
import { PaymentService } from 'app/shared/services/payment.service';

@Component({
  selector: 'app-add-billing-method-dialog',
  templateUrl: './add-billing-method-dialog.component.html',
  styleUrls: ['./add-billing-method-dialog.component.scss']
})
export class AddBillingMethodDialogComponent implements OnInit, OnDestroy {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  public form: FormGroup;
  public errorMessage: string;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#000',
        fontWeight: '300',
        fontFamily: 'Raleway',
        fontSize: '12px',
        '::placeholder': {
          color: '#E0E0E0',
          fontFamily: 'Raleway',
        },
      },
      invalid: {
        color: '#AD262D'
      }
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'auto',
  };

  constructor(private stripeService: StripeService,
              private userService: UserService,
              private paymentService: PaymentService,
              private dialogRef: MatDialogRef<AddBillingMethodDialogComponent>) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  public createPaymentToken(): void {
      this.stripeService.createToken(this.card.element, {name: `${this.form.controls.firstName.value} ${this.form.controls.lastName.value}`})
        .pipe(untilDestroyed(this))
        .subscribe(result => this.createPaymentMethod(result.token.id));
  }

  public createPaymentMethod(token) {
    let cardToken  = {
      type: "card",
      card: {
        token: token
      }
    };

    this.paymentService.createPaymentMethod(cardToken)
      .pipe(untilDestroyed(this))
      .subscribe(
        (paymentMethods) => this.dialogRef.close(paymentMethods),
        ({error}) => console.log(error));
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

  ngOnDestroy(): void { }
}
