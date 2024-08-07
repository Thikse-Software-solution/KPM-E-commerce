import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../services/order.model'; 

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://api.yourdomain.com/orders'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getOrderHistory(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`);
  }
}
