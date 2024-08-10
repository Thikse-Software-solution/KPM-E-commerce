import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss'
})
export class FeatureComponent {
 products: any[] = [];
  featureProducts: any[] = [];

  constructor(private http: HttpClient, private router: Router,private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts().subscribe( {
      next : products =>{ this.products = products;
      this.featureProducts = this.products.filter(product => product.feature === true);}
     
    });
  }

  fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/products.json');
  }
   buyProduct(product: any): void {
   this.router.navigate(['/sheshine/view',product.id]);
  }
}
