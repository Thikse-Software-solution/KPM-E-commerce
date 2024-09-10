import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SharedService } from '../../services/shared.service';  

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string | null = null;
  searchQuery: string = '';
  userId: number | null = null; // Ensure userId is available

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadUserIdFromLocalStorage(); // Load userId from local storage

    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      console.log('Received category:', this.category); // Debug log
      this.applyFilters();
    });

    this.sharedService.currentSearchQuery.subscribe(query => {
      this.searchQuery = query;
      this.applyFilters();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase().trim();
    const price = parseFloat(query);

    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.category ? product.category === this.category : true;
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesPrice = !isNaN(price) && product.price <= price;

      return matchesCategory && (matchesName || matchesPrice);
    });

    console.log('Filtered products:', this.filteredProducts); // Debug log
  }

  toggleFavorite(product: any) {
    product.isFavorite = !product.isFavorite;
  }

  buyNow(product: any) {
    this.router.navigate(['/sheshine/view', product.id]);
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
 getStarClass(index: number, rating: number): string {
    return index < rating ? 'fa fa-star fas' : 'fa fa-star far';
  }

  setRating(product: any, rating: number) {
    product.rating = rating;
  }
  // Load userId from local storage
  loadUserIdFromLocalStorage() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.userId = user.id;
        console.log('User ID loaded from local storage:', this.userId);
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    } else {
      console.error('No user data found in local storage.');
    }
  }
}
