// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  getCartItems() {
    return this.cartSubject.value;
  }
  

  addToCart(item: any) {
    const cartItems = this.getCartItems();
     const currentItems = this.cartItems.value;
    this.cartSubject.next([...cartItems, item]);
     this.cartItems.next([...currentItems, item]);
    
  }
   getCartItemCount() {
    return this.cartItems.value.length;
  }

  removeFromCart(item: any) {
    const cartItems = this.getCartItems().filter(cartItem => cartItem !== item);
    this.cartSubject.next(cartItems);
     const currentItems = this.cartItems.value;
      this.cartItems.next(cartItems);
  }

  getTotalAmount(): number {
    return this.getCartItems().reduce((total, item) => total + item.price, 0);
  }
}
