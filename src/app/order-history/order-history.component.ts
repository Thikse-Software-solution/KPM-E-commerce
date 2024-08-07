import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../services/order.model'; 

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];
  userId: string = '123'; // Replace with the actual user ID or get it from a user service

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    this.orderService.getOrderHistory(this.userId).subscribe({
      next: (orders) => this.orders = orders,
      error: (err) => console.error('Error fetching order history', err)
    });
  }
}
