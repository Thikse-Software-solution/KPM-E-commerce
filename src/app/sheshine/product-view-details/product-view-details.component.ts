import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.scss']
})
export class ProductViewDetailsComponent implements OnInit {
  product: any;
  isFavorite: boolean = false;
  cartItems: CartItem[] = [];
  userId: number | null = null;
  quantity: number = 1; // Initialize quantity to 1
  productDetails: any;
  reviewText: string = '';
  reviews: string[] = [];
   
  colors: string[] = ['#000', '#EDEDED', '#D5D6D8', '#EFE0DE', '#AB8ED1', '#F04D44'];

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Get product ID from route parameters
    const id = +this.route.snapshot.paramMap.get('id')!;

    // Fetch the product details using the product ID
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        console.log('Product fetched:', this.product);

        // Ensure the quantity is initialized to 1 if not already set
        if (this.product && (typeof this.product.quantity !== 'number' || isNaN(this.product.quantity))) {
          this.product.quantity = 1;
        }
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

  // Increase quantity
  increaseQuantity() {
    this.quantity++;
    this.product.quantity = this.quantity;
    console.log('Quantity increased:', this.quantity);
  }

  // Decrease quantity, ensuring it does not go below 1
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.product.quantity = this.quantity;
      console.log('Quantity decreased:', this.quantity);
    } else {
      console.log('Quantity is already at the minimum value:', this.quantity);
    }
  }

  addToCart(product: any): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID is not available in local storage');
      // Handle the case where userId is not available
      return;
    }

    const parsedUserId = parseInt(userId, 10);

    this.cartService.addOrUpdateCartItem(parsedUserId, product.id, product.quantity)
      .subscribe({
        next: (response) => {
          console.log('Product added to cart successfully:', response);
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
        }
      });
  }

  buyNow(id: number): void {
    // Ensure the product quantity is set correctly before navigating
    if (this.product) {
      this.product.quantity = this.quantity;
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
