import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.scss']
})
export class ProductViewDetailsComponent implements OnInit {
  @Input() product: any;
  isFavorite: boolean = false;
  productDetails: any;
  // quantity: number = 1;
  reviewText: string = '';
  reviews: string[] = [];
  colors: string[] = ['#000', '#EDEDED', '#D5D6D8', '#EFE0DE', '#AB8ED1', '#F04D44'];

  changeImage(image: string) {
    this.product.thumbnail = image;
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

  // Method to increase product quantity
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

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
   
  ) {}

buyNow(id: number): void {
  // Ensure the product quantity is set to 1 before navigating
  if (this.product) {
    this.product.quantity = 1;
  }

  // Log ID and quantity for verification
  console.log('Navigating to address-list with product ID:', id);
  console.log('Product quantity:', this.product.quantity);

  // Navigate to the address list page with product ID and quantity as query parameters
  this.router.navigate(['/address-list'], {
    queryParams: { 
      ids: id,  // Pass single product ID as a string
      quantities: this.product.quantity // Pass single product quantity
    }
  }).then(success => {
    if (success) {
      console.log('Navigation successful!');
    } else {
      console.error('Navigation failed!');
    }
  });
}

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

 ngOnInit(): void {
  const id = +this.route.snapshot.paramMap.get('id')!;
  
  // Fetch the products and find the one with the matching ID
  this.productService.getProducts().subscribe(products => {
    this.product = products.find(p => p.id === id);

    // Ensure the quantity is initialized to 1 if not already set
    if (this.product && (typeof this.product.quantity !== 'number' || isNaN(this.product.quantity))) {
      this.product.quantity = 1;
    }
  });
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

}
