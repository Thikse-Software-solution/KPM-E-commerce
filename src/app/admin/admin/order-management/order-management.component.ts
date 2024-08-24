import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService['getOrders']().subscribe((data: any[]) => {
      this.orders = data;
    });
  }

  updateStatus(orderId: number, status: string): void {
    this.orderService['updateOrderStatus'](orderId, status).subscribe(() => {
      this.loadOrders();
    });
  }

  handleReturn(orderId: number): void {
    this.orderService['handleReturn'](orderId).subscribe(() => {
      this.loadOrders();
    });
  }

  handleRefund(orderId: number): void {
    this.orderService['handleRefund'](orderId).subscribe(() => {
      this.loadOrders();
    });
  }
}
