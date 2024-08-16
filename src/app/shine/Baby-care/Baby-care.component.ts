import { Component, OnInit } from '@angular/core';
import { ShineProductService } from '../services/shine-product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-baby-care',
  templateUrl: './baby-care.component.html',
  styleUrls: ['./baby-care.component.scss']
})
export class BabyCareComponent implements OnInit {
  products: any[] = [];
  category: string = 'Baby Care';

  constructor(
    private productService: ShineProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
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
   this.router.navigate(['/sheshine/view', product.id]);
  }
}