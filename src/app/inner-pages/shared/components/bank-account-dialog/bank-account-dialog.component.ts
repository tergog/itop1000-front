import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaymentService } from 'app/shared/services/payment.service';

@Component({
  selector: 'app-bank-account-dialog',
  templateUrl: './bank-account-dialog.component.html',
  styleUrls: ['./bank-account-dialog.component.scss']
})
export class BankAccountDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  errorMessage: string;
  public ngUnsubscribe = new Subject<void>();

  constructor(private paymentService: PaymentService,
              private dialogRef: MatDialogRef<BankAccountDialogComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      country: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      routing_number: new FormControl('', [Validators.required]),
      account_number: new FormControl('', [Validators.required]),
      account_holder_name: new FormControl('', [Validators.required]),
      account_holder_type: new FormControl('', [Validators.required])
    });
  }

  onConnect(): void {
    if (this.form.invalid){
      return;
    }
    this.paymentService.verifyBankAccount(this.form.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
      this.errorMessage = null;
      this.dialogRef.close(res);
      },
      (error: HttpErrorResponse) => {
      this.errorMessage = error.error.error.raw.message;
      });
  }

  onSelect(event: MatSelectChange): void {
    this.form.get('account_holder_type').setValue(event.value);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
