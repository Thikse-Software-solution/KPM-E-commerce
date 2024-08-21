import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ShineProductService } from '../services/shine-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shine-product-view',
  templateUrl: './shine-product-view.component.html',
  styleUrls: ['./shine-product-view.component.scss']
})
export class ShineProductViewComponent implements OnInit {
 @Input() product: any;
  isFavorite: boolean = false;
  productDetails: any;
  quantity: number = 1;
  reviewText: string = '';
  reviews: string[] = [];
  subcategoryProducts: any[] = [];
  
  
  colors: string[] = ['#000', '#EDEDED', '#D5D6D8', '#EFE0DE', '#AB8ED1', '#F04D44'];

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private shineProductService: ShineProductService
  ) {}

ngOnInit(): void {
  const id = +this.route.snapshot.paramMap.get('id')!;
  this.shineProductService.getProductById(id).subscribe(product => {
    this.product = product;

    // Ensure the quantity is initialized to 1 if not already set
     if (this.product && (typeof this.product.quantity !== 'number' || isNaN(this.product.quantity))) {
      this.product.quantity = 1;
    }
    if (this.product?.subcategory) {
        this.fetchSubcategoryProducts(this.product.subcategory);
      }
  });
  }
 
  fetchSubcategoryProducts(subcategory: string) {
    this.shineProductService.getProductsBySubcategory(subcategory).subscribe(products => {
      this.subcategoryProducts = products.filter(p => p.id !== this.product?.id); // Exclude the current product
    });
  }

  changeImage(image: string) {
    this.product.mainimage = image;
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

  increaseQuantity() {
    if (this.product) {
      this.product.quantity++;
    }
  }

  // Method to decrease product quantity
  decreaseQuantity() {
    if (this.product && this.product.quantity > 1) {
      this.product.quantity--;
    }
  }

  toggleFavorite(product: any) {
    this.isFavorite = !this.isFavorite;
  }

  submitReview() {
    if (this.reviewText.trim()) {
      this.reviews.unshift(this.reviewText);
      console.log(`Review submitted: ${this.reviewText}`);
      this.reviewText = '';
    } else {
      alert('Review cannot be empty.');
    }
  }

  buyNow(id: number): void {
    this.router.navigate(['/address-list', id]);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  activeSections: boolean[] = [false, false, false, false];

  toggleContent(index: number): void {
    this.activeSections[index] = !this.activeSections[index];
  }

  isActive(index: number): boolean {
    return this.activeSections[index];
  }

  getClass(index: number): string {
    return this.isActive(index) ? 'collapsible active' : 'collapsible';
  }









  viewProduct(product: any):void {
  this.router.navigate(['/shine/view', product.id]);
}

}