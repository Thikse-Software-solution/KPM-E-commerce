import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService, Product } from '../services/product.service';


@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  products: any[] = [];
  trendingProducts: any[] = [];

  constructor(private http: HttpClient, private router: Router,private productService: ProductService) { }

  ngOnInit() {
    this.fetchProducts().subscribe(products => {
      this.products = products;
      this.trendingProducts = this.products.filter(product => product.trend === true);
    });
  }

  fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/products.json');
  }
  buyProduct(product: any): void {
   this.router.navigate(['/sheshine/view',product.id]);
  }
}
