import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSubject: BehaviorSubject<Product | null> = new BehaviorSubject<Product | null>(null);
  public product$: Observable<Product | null> = this.productSubject.asObservable();
  private apiUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) {
    this.loadProduct();
  }

  private loadProduct() {
    this.http.get<Product[]>(this.apiUrl).pipe(
      map((data: Product[]) => {
        // Assuming the API returns an array of products
        return data[0]; // Get the first product for now
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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === id)!)
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())))
    );
  }
}
