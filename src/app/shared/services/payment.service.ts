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
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts.paymentMethod}`, paymentMethodData);
  }

  public deletePaymentMethod(paymentMethodId): Observable<any> {
    return this.http.delete(`${this.apiUrl}${ApiConstants.accounts.paymentMethod}/${paymentMethodId}`);
  }

  public updatePaymentMethod(paymentMethodData): Observable<any> {
    return this.http.put(`${this.apiUrl}${ApiConstants.accounts.paymentMethod}`, paymentMethodData);
  }

  public getPaymentMethods(): Observable<any> {
    return this.http.get(`${this.apiUrl}${ApiConstants.accounts.paymentMethods}`);
  }

  public getChargesList(): Observable<any> {
    return this.http.get(`${this.apiUrl}${ApiConstants.accounts.chargesList}`);
  }
}

