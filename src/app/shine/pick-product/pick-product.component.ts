import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShineProductService } from '../services/shine-product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-pick-product',
  templateUrl: './pick-product.component.html',
  styleUrls: ['./pick-product.component.scss']
})
export class PickProductComponent implements OnInit {

  products: any[] = [];  // Array to hold all products
  filteredProducts: any[] = [];  // Array to hold the filtered products
  searchQuery: string = '';  // Search query for filtering

  // New variables for controlling the number of visible rows
  rowsToShow: number = 2;  // Number of rows to display initially
  itemsPerRow: number = 4; // Number of products per row (depends on your layout)
  showAllProducts: boolean = false; // Flag to toggle between showing all or limited rows

  constructor(private productService: ShineProductService, private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllProducts();  // Fetch all products on component initialization
  }

  // Method to fetch all products
  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data: any[]) => {
        this.products = data;  // Assign the fetched products to the products array
        this.applyFilters();  // Apply filters after fetching products
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

  // Toggle visibility of all products
  toggleViewMore() {
    this.showAllProducts = !this.showAllProducts;
  }

  // Determine the number of products to display
  getDisplayedProducts() {
    if (this.showAllProducts) {
      return this.filteredProducts;
    } else {
      return this.filteredProducts.slice(0, this.rowsToShow * this.itemsPerRow);
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
    return index < rating ? 'fa fa-star fas' : 'fa fa-star far';
  }

  setRating(product: any, rating: number) {
    product.rating = rating;
  }
}
