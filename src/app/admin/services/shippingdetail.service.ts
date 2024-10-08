import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingDetailService {
  private baseUrl = 'http://localhost:8080/api/analytics/shipping-details';

  constructor(private http: HttpClient) { }

  getShippingDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${orderId}`);
  }
}
