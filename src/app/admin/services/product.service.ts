import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; // Adjust base URL if necessary

  constructor(private http: HttpClient) { }
addProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(`${this.apiUrl}/add`, product, { headers });
  }
   
   getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/getall`);
  }
   getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Method to get a single product by ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }
 updateProduct(productId: number, product: Product): Observable<Product> {
  return this.http.put<Product>(`${this.apiUrl}/update/${productId}`, product);
}

deleteProduct(productId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delete/${productId}`);
}

}
