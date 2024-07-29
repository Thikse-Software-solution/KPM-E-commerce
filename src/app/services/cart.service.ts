// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  addToCart(item: any) {
    const currentCart = this.cart.value;
    this.cart.next([...currentCart, item]);
  }
    removeFromCart(item: any) {
    const currentCart = this.cart.value.filter(cartItem => cartItem !== item);
    this.cart.next(currentCart);
  }


  getCart() {
    return this.cart.value;
  }

  getTotalAmount() {
    return this.cart.value.reduce((total, item) => total + item.price, 0);
  }
}
