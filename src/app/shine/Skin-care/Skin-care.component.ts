import { Component, OnInit } from '@angular/core';
import { ShineProductService } from '../services/shine-product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-Skin-care',
  templateUrl: './Skin-care.component.html',
  styleUrls: ['./Skin-care.component.scss']
})
export class SkinCareComponent implements OnInit {

  products: any[] = [];
  category: string = 'skin care';

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
    // alert(`${product.name} added to cart!`);
  }

 buyNow(product: any): void {
     this.router.navigate(['/shine/view', product.id]);
    // Navigate to checkout or perform a quick buy action
  }

}
