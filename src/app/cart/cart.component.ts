// src/app/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  cartItems: any[] = [];
   totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
        this.totalAmount = this.cartService.getTotalAmount();
    });
  }
   removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  // buyNow() {
  //   // Navigate to checkout page or handle purchase logic
  //   // Example: Navigate to checkout page
  //   this.router.navigate(['/checkout']);
  // }

 
}
