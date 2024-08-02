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
  isFavorite = false;

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
    });
  }

  toggleFavorite(product: any) {
    this.isFavorite = !this.isFavorite;
  }

  buyNow(product: any) {
    this.router.navigate(['/address-list'], { queryParams: { productId: product.id } });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
