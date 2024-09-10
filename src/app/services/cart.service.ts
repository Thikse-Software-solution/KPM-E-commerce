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

  // Get current cart items
  getCartItems() {
    return this.cartSubject.value;
  }

  // Add an item to the cart
  addToCart(item: any) {
    const cartItems = this.getCartItems();

    // Check if the item already exists in the cart
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      // If the item exists, update its quantity
      existingItem.quantity += item.quantity;
    } else {
      // If the item does not exist, add it to the cart
      cartItems.push({ ...item });
    }

    // Update both subjects
    this.updateCart(cartItems);
  }

  // Update the cart and cartItems subjects
  private updateCart(cartItems: any[]) {
    this.cartSubject.next(cartItems);
    this.cartItems.next(cartItems);
  }

  // Get the total number of items in the cart
  getCartItemCount() {
    return this.cartSubject.value.length;
  }

  // Remove an item from the cart
  removeFromCart(item: any) {
    const updatedCartItems = this.getCartItems().filter(cartItem => cartItem.id !== item.id);
    this.updateCart(updatedCartItems);
  }

  // Get the total amount of the cart items
  getTotalAmount(): number {
    return this.getCartItems().reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }
}
