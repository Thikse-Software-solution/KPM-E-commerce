import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
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

    private ordersSubject = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSubject.asObservable();



  // Add a new order
  addOrder(order: any): void {
    const currentOrders = this.ordersSubject.value;
    this.ordersSubject.next([...currentOrders, { ...order, status: 'Processing', canCancel: this.canCancel(order.date) }]);
  }

  // Cancel an order
  cancelOrder(orderId: number): void {
    const updatedOrders = this.ordersSubject.value.map(order => {
      if (order.product.id === orderId) {
        return { ...order, status: 'Cancelled', canCancel: false };
      }
      return order;
    });
    this.ordersSubject.next(updatedOrders);
  }

  // Mark an order as received
  markAsReceived(orderId: number): void {
    const updatedOrders = this.ordersSubject.value.map(order => {
      if (order.product.id === orderId) {
        return { ...order, status: 'Received', canCancel: false };
      }
      return order;
    });
    this.ordersSubject.next(updatedOrders);
  }

  // Return an order
  returnOrder(orderId: number): void {
    const updatedOrders = this.ordersSubject.value.map(order => {
      if (order.product.id === orderId) {
        return { ...order, status: 'Returned' };
      }
      return order;
    });
    this.ordersSubject.next(updatedOrders);
  }

  // Check if an order is still within the cancellation period
  private canCancel(orderDate: string): boolean {
    const orderDateObj = new Date(orderDate);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - orderDateObj.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 10;
  }

  // Update cancellation availability based on the 10-day window
  checkCancellationAvailability(): void {
    const updatedOrders = this.ordersSubject.value.map(order => {
      return { ...order, canCancel: this.canCancel(order.date) };
    });
    this.ordersSubject.next(updatedOrders);
  }
}
