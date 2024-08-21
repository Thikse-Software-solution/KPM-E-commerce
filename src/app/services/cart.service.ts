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

    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex === -1) {
      // If the item does not exist, add it to the cart
      this.cartSubject.next([...cartItems, item]);
      this.cartItems.next([...currentItems, item]);
    } else {
      // If the item already exists, update its quantity or any other property
      cartItems[existingItemIndex].quantity += item.quantity; // Example: incrementing quantity
      this.cartSubject.next([...cartItems]);
      this.cartItems.next([...currentItems]);
    }
  }

  getCartItemCount() {
    return this.cartItems.value.length;
  }

  removeFromCart(item: any) {
    const cartItems = this.getCartItems().filter(cartItem => cartItem.id !== item.id);
    this.cartSubject.next(cartItems);
    const currentItems = this.cartItems.value;
    this.cartItems.next(cartItems);
  }

  getTotalAmount(): number {
    return this.getCartItems().reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }
}
