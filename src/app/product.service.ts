// src/app/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
   private productSubject: BehaviorSubject<Product | null> = new BehaviorSubject<Product | null>(null);
  public product$: Observable<Product | null> = this.productSubject.asObservable();
  private apiUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) { this.loadProduct(); }
  
    private loadProduct() {
    this.http.get<Product>(this.apiUrl).pipe(
      map((data: Product) => {
        // Transform data if needed
        return data;
      })
    ).subscribe(product => {
      this.productSubject.next(product);
    });
  }

  setProduct(product: Product) {
    this.productSubject.next(product);
  }
    getProduct(): Observable<Product | null> {
    return this.product$;
  }

  getProducts(): Observable<any[]> {
     return this.http.get<any[]>(this.apiUrl);
  }
}
