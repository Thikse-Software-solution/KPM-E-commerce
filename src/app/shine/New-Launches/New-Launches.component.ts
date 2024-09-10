import { Component, OnInit } from '@angular/core';
import { ShineProductService } from '../services/shine-product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-New-Launches',
  templateUrl: './New-Launches.component.html',
  styleUrls: ['./New-Launches.component.scss']
})
export class NewLaunchesComponent implements OnInit {

 products: any[] = [];
  category: string = 'new launches';
   filteredProducts: any[] = [];

  constructor(
    private productService: ShineProductService,
    private cartService: CartService,
        private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getProducts();
     this.sharedService.currentSearchQuery.subscribe(query => {
      this.applyFilters(query);
    });
  }

  getProducts(): void {
    this.productService.getProductsByCategory(this.category).subscribe((data: any[]) => {
      this.products = data;
       this.filteredProducts = this.products; 
    });
  }
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

 buyNow(product: any): void {
     this.router.navigate(['/shine/view', product.id]);
    // Navigate to checkout or perform a quick buy action
  }
}
