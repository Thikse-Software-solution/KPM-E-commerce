import { Component, OnInit } from '@angular/core';
import { ShineProductService } from '../services/shine-product.service';
import { CartService } from '../../services/cart.service';
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
   // Search query for filtering

  constructor(private productService: ShineProductService,  private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit() {
    this.getAllProducts();
    
        // Subscribe to search query changes
    this.sharedService.currentSearchQuery.subscribe(query => {
      this.applyFilters(query);
    });
// Fetch all products on component initialization
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
     this.router.navigate(['/shine/view', product.id]);
  }

  addToCart(product: any) {
    console.log('Add to Cart clicked for:', product);
      this.cartService.addToCart(product);
  }

  getStarClass(index: number, rating: number): string {
    return index < rating ? 'fa fa-star fas' : 'fa fa-star far';
  }

  setRating(product: any, rating: number) {
    product.rating = rating;
  }
}

