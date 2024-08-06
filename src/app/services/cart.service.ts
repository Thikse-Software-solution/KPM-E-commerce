// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  getCartItems() {
    return this.cartSubject.value;
  }

  addToCart(item: any) {
    const cartItems = this.getCartItems();
    this.cartSubject.next([...cartItems, item]);
  }

  removeFromCart(item: any) {
    const cartItems = this.getCartItems().filter(cartItem => cartItem !== item);
    this.cartSubject.next(cartItems);
  }

  getTotalAmount(): number {
    return this.getCartItems().reduce((total, item) => total + item.price, 0);
  }
}
