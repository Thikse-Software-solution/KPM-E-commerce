import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShineProductService {

  private baseUrl: string = '/assets/data/shineproduct.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Fetch products by category
  getProductsByCategory(category: string): Observable<any[]> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const filteredProducts = products.filter(product => product.category === category);
        observer.next(filteredProducts);
        observer.complete();
      });
    });
  }

  // Fetch a product by its ID
  getProductById(id: number): Observable<any> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const product = products.find(p => p.id === id);
        observer.next(product);
        observer.complete();
      });
    });
  }
}
