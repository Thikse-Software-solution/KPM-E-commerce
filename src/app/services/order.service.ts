import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, catchError } from 'rxjs';
import { Order } from '../services/order.model'; 

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders'; // Update with your API URL

  constructor(private http: HttpClient) { }

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  getOrderHistory(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`);
  }

  cancelOrder(orderId: number): void {
    const updatedOrders = this.ordersSubject.value.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'Cancelled', canCancel: false };
      }
      return order;
    });
    this.ordersSubject.next(updatedOrders);
  }

  markAsReceived(orderId: number): void {
    const updatedOrders = this.ordersSubject.value.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'Received', canCancel: false };
      }
      return order;
    });
    this.ordersSubject.next(updatedOrders);
  }

  returnOrder(orderId: number): void {
    const updatedOrders = this.ordersSubject.value.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'Returned' };
      }
      return order;
    });
    this.ordersSubject.next(updatedOrders);
  }

  private canCancel(orderDate: string): boolean {
    const orderDateObj = new Date(orderDate);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - orderDateObj.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 10;
  }

  checkCancellationAvailability(): void {
    const updatedOrders = this.ordersSubject.value.map(order => ({
      ...order,
      canCancel: this.canCancel(order.date)
    }));
    this.ordersSubject.next(updatedOrders);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
  return this.http.post<Order>(`${this.apiUrl}/place`, order).pipe(
    catchError(this.handleError<Order>('createOrder'))
  );
}

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/update/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  verifyPayment(paymentId: string, orderId: string, signature: string): Observable<any> {
    const verifyPayload = {
      paymentId,
      orderId,
      signature
    };

    return this.http.post<any>(`${this.apiUrl}/verify`, verifyPayload);
  }
}
