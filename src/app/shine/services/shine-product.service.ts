import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  keybenefit: string;
  size: string;
  mrp: number;
  discount: number;
  price: number;
  image: string;
  image1: string;
  category?: string;
  subcategory?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShineProductService {

  private baseUrl: string = '/assets/data/shineproduct.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Fetch products by subcategory
  getProductsBySubcategory(subcategory: string): Observable<Product[]> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const filteredProducts = products.filter(product => product.subcategory === subcategory);
        observer.next(filteredProducts);
        observer.complete();
      });
    });
  }
   getProductsByCategory(category: string): Observable<Product[]> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const filteredProducts = products.filter(product => product.category === category);
        observer.next(filteredProducts);
        observer.complete();
      });
    });
  }

  // Fetch a product by its ID
  getProductById(id: number): Observable<Product> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const product = products.find(p => p.id === id);
        observer.next(product);
        observer.complete();
      });
    });
  }
}
