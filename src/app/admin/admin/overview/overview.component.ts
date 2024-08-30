import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../services/product.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  totalIncome: number = 0;
  totalProducts: number = 0;
  newCustomers: number = 0;
  trendingProducts: number = 0;
  lowStockProducts: Product[] = [];
  offerProducts: Product[] = [];
  trendingProductsThisWeek: Product[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadOverviewData();
  }

  loadOverviewData(): void {
    // // this.orderService.getTotalIncomeForMonth().subscribe(income => this.totalIncome = income);
    // this.productService.getTotalProducts().subscribe(count => this.totalProducts = count);
    // // this.customerService.getNewCustomersForMonth().subscribe(count => this.newCustomers = count);
    // this.productService.getLowStockProducts().subscribe(products => this.lowStockProducts = products);
    // this.productService.getOfferProducts().subscribe(products => this.offerProducts = products);
    // this.productService.getTrendingProductsThisWeek().subscribe(products => this.trendingProductsThisWeek = products);
    // this.productService.getTrendingProducts().subscribe(count => this.trendingProducts = count);
  }
}
