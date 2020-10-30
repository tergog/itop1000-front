import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConstants } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public createPaymentMethod(paymentMethodData): Observable<object> {
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts.createPaymentMethod}`, paymentMethodData);
  }

  public getPaymentMethods(){
    return this.http.post(`${this.apiUrl}${ApiConstants.accounts.getPaymentMethods}`, {});
  }
}
