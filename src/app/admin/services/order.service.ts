import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateOrderStatus(orderId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${orderId}/status`, { status });
  }

  handleReturn(orderId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${orderId}/return`, {});
  }

  handleRefund(orderId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${orderId}/refund`, {});
  }
}
