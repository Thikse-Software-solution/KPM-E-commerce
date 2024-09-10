import { Component, OnInit } from '@angular/core';
import { ShineProductService } from '../services/shine-product.service';
import { CartItem, CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-shineproducts',
  templateUrl: './shineproducts.component.html',
  styleUrls: ['./shineproducts.component.scss']
})
export class ShineproductsComponent implements OnInit {

  products: any[] = [];  // Array to hold all products
  filteredProducts: any[] = [];  // Array to hold the filtered products
  userId: number = 0; // Define a variable to store userId

  constructor(
    private productService: ShineProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.loadUserId();

    // Subscribe to search query changes
    this.sharedService.currentSearchQuery.subscribe(query => {
      this.applyFilters(query);
    });
  }

  // Method to fetch all products
  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data: any[]) => {
        this.products = data;  // Assign the fetched products to the products array
        this.filteredProducts = this.products;  // Initialize filteredProducts with all products
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Method to apply filters based on search query
  applyFilters(query: string) {
    const searchQuery = query.toLowerCase().trim();

    if (searchQuery) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.price.toString().includes(searchQuery)
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  // Example methods for product interactions
 buyNow(product: any) {
  // Navigate to the product details page with the entire product object in navigation state
  this.router.navigate(['/shine/view', product.id], {
    state: { product: product }
  });
}
addToCart(product: any): void {
  // Ensure the quantity is set
  product.quantity = 1;

  // Retrieve userId from local storage
  const userId = localStorage.getItem('userId');
  
  if (userId) {
    const parsedUserId = parseInt(userId, 10);

    // Call the addOrUpdateCartItem method from CartService
    this.cartService.addOrUpdateCartItem(parsedUserId, product.id, product.quantity)
      .subscribe({
        next: () => {
          console.log('Product added to cart:', product);
          
          // Navigate to the cart page with the product ID and quantity in the query parameters
          this.router.navigate(['/cart'], {
            queryParams: { 
              id: product.id, 
              quantity: product.quantity 
            }
          });
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
        }
      });
  } else {
    console.error('User ID is not available.');
    // Handle the case where userId is not available (e.g., prompt user to log in)
  }
}
  getStarClass(index: number, rating: number): string {
    return index < rating ? 'fa fa-star fas' : 'fa fa-star far';
  }

  setRating(product: any, rating: number) {
    product.rating = rating;
  }

  // Load userId from local storage
  private loadUserId() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.userId = user.id; // Extract userId from the parsed object
        console.log('User ID loaded from local storage:', this.userId);
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    } else {
      console.error('User ID not found in local storage.');
    }
  }
}
