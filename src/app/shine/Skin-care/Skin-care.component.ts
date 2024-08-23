import { Component, OnInit } from '@angular/core';
import { ShineProductService } from '../services/shine-product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-Skin-care',
  templateUrl: './Skin-care.component.html',
  styleUrls: ['./Skin-care.component.scss']
})
export class SkinCareComponent implements OnInit {

  products: any[] = [];
  category: string = 'skin care';
  filteredProducts: any[] = [];

  constructor(
    private productService: ShineProductService,
    private cartService: CartService,
     private router: Router,
    private route: ActivatedRoute, private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getProducts();


         // Subscribe to search query changes
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
    this.cartService.addToCart(product);
    // alert(`${product.name} added to cart!`);
  }

 buyNow(product: any): void {
     this.router.navigate(['/shine/view', product.id]);
    // Navigate to checkout or perform a quick buy action
  }

}
