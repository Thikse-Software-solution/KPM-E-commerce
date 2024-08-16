import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

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

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();

    // Subscribing to route parameters to handle category filtering
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      console.log('Received category:', this.category); // Debug log
      this.applyFilters();
    });
  }

  // Fetch products from service
  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  // Apply search and category filters
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

  // Toggle favorite status for the specific product
  toggleFavorite(product: any) {
    product.isFavorite = !product.isFavorite;
  }

  // Navigate to product details for buying
  buyNow(product: any) {
    this.router.navigate(['/sheshine/view', product.id]);
  }

  // Add the product to the cart
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  // Method to trigger filtering when the search query changes
  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }
}
