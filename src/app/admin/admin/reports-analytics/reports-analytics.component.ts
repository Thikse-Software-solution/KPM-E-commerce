// src/app/reports/reports.component.ts

import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl:'./reports-analytics.component.html',
  styleUrls: ['./reports-analytics.component.css']
})
export class ReportsAnalyticsComponent implements OnInit {
  salesReports: any[] = [];
  customerBehavior: any[] = [];
  inventoryReports: any[] = [];

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.loadSalesReports();
    this.loadCustomerBehavior();
    this.loadInventoryReports();
  }

  loadSalesReports(): void {
    this.reportsService.getSalesReports().subscribe(
      data => {
        this.salesReports = data;
        console.log('Sales Reports:', data); // Check if data is received
      },
      error => {
        console.error('Error fetching sales reports', error); // Check for errors
      }
    );
  }

  loadCustomerBehavior(): void {
    this.reportsService.getCustomerBehavior().subscribe(
      data => {
        this.customerBehavior = data;
        console.log('Customer Behavior:', data); // Check if data is received
      },
      error => {
        console.error('Error fetching customer behavior', error); // Check for errors
      }
    );
  }

  loadInventoryReports(): void {
    this.reportsService.getInventoryReports().subscribe(
      data => {
        this.inventoryReports = data;
        console.log('Inventory Reports:', data); // Check if data is received
      },
      error => {
        console.error('Error fetching inventory reports', error); // Check for errors
      }
    );
  }
}
