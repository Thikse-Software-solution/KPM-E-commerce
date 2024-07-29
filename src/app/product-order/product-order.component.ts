import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss']
})
export class ProductOrderComponent {
  product = {
    name: 'Blood Orange and Rosehip Lip Balm',
    description: `Suitable for: Dry, chapped & pigmented lips`,
    keybenfit: `Key benefit: Repair the natural barrier & boost collagen synthesis`,
    size:'5g',

    mrp: 1000,
    discount: 20,
    price: 800,
    image: '../../assets/images/BloodOrange_RosehipLipBalm.webp'
  };

  isFavorite = false;

  toggleFavorite(product: any) {
    this.isFavorite = !this.isFavorite;
  }

  // addToCart() {
  //   // Implement add to cart functionality here
  //   alert('Added to cart');
  // }

  buyNow() {
    // Implement buy now functionality here
    alert('Buy now');
  }

   constructor(private cartService: CartService) {}

  addToCart(product: any) {
    setTimeout(function() { 
  alert("$premium$");
}, 1);
    this.cartService.addToCart(product);
  }
}
