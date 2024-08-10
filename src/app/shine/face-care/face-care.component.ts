import { Component, OnInit } from '@angular/core';
import { ShineProductService } from '../services/shine-product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-face-care',
  templateUrl: './face-care.component.html',
  styleUrls: ['./face-care.component.scss']
})
export class FaceCareComponent implements OnInit {
products: any[] = [];
  category: string = 'face care';

  constructor(
    private productService: ShineProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProductsByCategory(this.category).subscribe((data: any[]) => {
      this.products = data;
    });
  }

  getStarClass(index: number, rating: number): string {
    if (index < rating) {
      return 'fas fa-star';
    } else if (index < Math.ceil(rating) && rating % 1 !== 0) {
      return 'fas fa-star-half-alt';
    } else {
      return 'far fa-star';
    }
  }

  setRating(product: any, rating: number): void {
    product.rating = rating;
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

  buyNow(product: any): void {
    this.addToCart(product);
    // Navigate to checkout or perform a quick buy action
  }
}
