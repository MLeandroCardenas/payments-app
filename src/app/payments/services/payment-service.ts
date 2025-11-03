import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentResponse } from '../models/payment-response.interface';
import { environment } from '../../../environments/environment';
import { Payment } from '../models/Payment.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private http = inject(HttpClient);

  public getAllPayments(): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(`${environment.serverUrl}/transactions`);
  }

  public createPayment(payment: Payment): Observable<PaymentResponse> {
       return this.http.post<PaymentResponse>(`${environment.serverUrl}/transactions`, payment);
    }
  
}
