import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  isFavorite = false;
   searchQuery: string = '';
  selectedCategory: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
     this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
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

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase().trim();
    const price = parseFloat(query);

    if (!query) {
      // If searchQuery is empty, show all products
      this.filteredProducts = this.selectedCategory ? 
        this.products.filter(product => product.category === this.selectedCategory) : 
        this.products;
    } else {
      // Filter products by name or price
      this.filteredProducts = this.products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesPrice = !isNaN(price) && product.price <= price;
        const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;

        return (matchesName || matchesPrice) && matchesCategory;
      });
    }
  }
  toggleFavorite(product: any) {
    this.isFavorite = !this.isFavorite;
  }

  buyNow(product: any) {
   this.router.navigate(['/sheshine/view', product.id]);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  showCategoryProducts(category: string): void {
      this.router.navigate(['products'], { queryParams: { category: category } });
     this.selectedCategory = category;
     
     this.applyFilters();
      // this.router.navigate(['/products']);
  }
}
