import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8080/api/payment'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  // Create order
  createOrder(amount: number): Observable<any> {
    const body = { amount };
    return this.http.post<any>(`${this.apiUrl}/createOrder`, body);
  }

  // Verify payment
  verifyPayment(paymentId: string, orderId: string, signature: string): Observable<any> {
    const params = new HttpParams()
      .set('paymentId', paymentId)
      .set('orderId', orderId)
      .set('signature', signature);

    return this.http.post<any>(`${this.apiUrl}/verifyPayment`, null, { params });
  }
}