import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaymentService } from 'app/shared/services/payment.service';

@Component({
  selector: 'app-get-paid-now-dialog',
  templateUrl: './get-paid-now-dialog.component.html',
  styleUrls: ['./get-paid-now-dialog.component.scss']
})
export class GetPaidNowDialogComponent implements OnInit, OnDestroy {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  public form: FormGroup;
  public errorMessage: string;
  public ngUnsubscribe = new Subject<void>();
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
              private paymentService: PaymentService,
              private dialogRef: MatDialogRef<GetPaidNowDialogComponent>) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });
  }

  getPaid(): void {
    this.stripeService.createToken(this.card.element, {name: `${this.form.controls.firstName.value} ${this.form.controls.lastName.value}`})
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          result => this.createPaymentMethod(result.token.id),
          error => console.log(error));
  }

  public createPaymentMethod(token): void {
    const cardToken  = {
      type: 'card',
      card: {
        token: token
      }
    };

    this.paymentService.createPaymentMethod(cardToken)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        () => this.dialogRef.close(),
        (error) => this.errorMessage = error.message);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
