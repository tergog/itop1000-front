import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { ApiConstants } from 'app/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public createPaymentMethod(paymentMethodData): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.payments.payments}`, { cardToken: paymentMethodData.card.token });
  }

  public deletePaymentMethod(paymentMethodId): Observable<any> {
    return this.http.delete(`${this.apiUrl}${ApiConstants.payments.payments}/${paymentMethodId}`);
  }

  public updatePaymentMethod(paymentMethodData): Observable<any> {
    return this.http.put(`${this.apiUrl}${ApiConstants.payments.payments}`, paymentMethodData);
  }

  public getPaymentMethods(): Observable<any> {
    return this.http.get(`${this.apiUrl}${ApiConstants.payments.payments}`);
  }

  public getChargesList(): Observable<any> {
    return this.http.get(`${this.apiUrl}${ApiConstants.payments.charges}`);
  }

  public verifyBankAccount(bankInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${ApiConstants.payments.bankAccount}`, bankInfo);
  }

  public verifyStripeAccount(): Observable<any> {
    return this.http.get(`${this.apiUrl}${ApiConstants.payments.accountLink}`);
  }

  public payout(): Observable<any> {
    return this.http.get(`${this.apiUrl}${ApiConstants.payments.payout}`);
  }
}

