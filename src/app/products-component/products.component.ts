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

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
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

    if (!query) {
      // If searchQuery is empty, show all products
      this.filteredProducts = this.products;
    } else {
      // Filter products by name or price
      this.filteredProducts = this.products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesPrice = !isNaN(price) && product.price <= price;

        return matchesName || matchesPrice;
      });
    }
  }

  toggleFavorite(product: any) {
    this.isFavorite = !this.isFavorite;
  }

  buyNow(product: any) {
    this.router.navigate(['/view-list',product.id]);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
