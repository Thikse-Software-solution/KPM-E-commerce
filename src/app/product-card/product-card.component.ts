// src/app/product-card/product-card.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy, Inject, ElementRef, Renderer2 } from '@angular/core';
import { ProductService } from '../product.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, AfterViewInit, OnDestroy {
  products: any[] = [];
  private scrollInterval: any;
  private isBrowser: boolean;

  constructor(
    private productService: ProductService,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.startScrolling();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }

  toggleFavorite(product: any): void {
    product.favorited = !product.favorited;
  }

  shop(product: any): void {
    console.log('Shop now for', product.title);
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

  startScrolling(): void {
    const container = this.el.nativeElement.querySelector('.card-container');
    if (!container) return;

    const cardWidth = container.scrollWidth / this.products.length;
    let scrollPosition = 0;

    this.scrollInterval = setInterval(() => {
      scrollPosition += cardWidth;
      if (scrollPosition >= container.scrollWidth) {
        scrollPosition = 0; // Reset scroll position
      }
      this.renderer.setProperty(container, 'scrollLeft', scrollPosition);
    }, 2000); // Scrolls every 2 seconds, adjust as needed
  }
}
