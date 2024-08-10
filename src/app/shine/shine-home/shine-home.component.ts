import { Component, OnInit } from '@angular/core';
import { ShineProductService } from '../services/shine-product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-shine-home',
  templateUrl: './shine-home.component.html',
  styleUrls: ['./shine-home.component.scss']
})
export class ShineHomeComponent implements OnInit {

  products: any[] = [];  // Array to hold all products
  filteredProducts: any[] = [];  // Array to hold the filtered products
  searchQuery: string = '';  // Search query for filtering

  constructor(private productService: ShineProductService,  private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.getAllProducts();  // Fetch all products on component initialization
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
  applyFilters() {
    const query = this.searchQuery.toLowerCase().trim();

    if (query) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(query) || 
        product.price.toString().includes(query)
      );
    } else {
      this.filteredProducts = this.products;  // If no query, show all products
    }
  }

  // Example methods for product interactions
  buyNow(product: any) {
     this.router.navigate(['/sheshine/view', product.id]);
  }

  addToCart(product: any) {
    console.log('Add to Cart clicked for:', product);
      this.cartService.addToCart(product);
  }

  getStarClass(index: number, rating: number): string {
    return index < rating ? 'fa fa-star filled' : 'fa fa-star';
  }

  setRating(product: any, rating: number) {
    product.rating = rating;
  }
}
