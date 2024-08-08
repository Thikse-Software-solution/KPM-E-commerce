import { Component, OnInit, AfterViewInit, OnDestroy, Inject, ElementRef, Renderer2 } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, AfterViewInit, OnDestroy {
  products: any[] = [];
  private isBrowser: boolean;
  private container!: HTMLElement;

  constructor(
    private productService: ProductService,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  buyProduct(product: any): void {
    this.router.navigate(['/sheshine/product', product.id]);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.container = this.el.nativeElement.querySelector('.card-container');
    }
  }

  ngOnDestroy(): void {
    // Cleanup logic if needed
  }

  moveNext(): void {
    if (this.isBrowser && this.container) {
      const containerWidth = this.container.offsetWidth;
      this.container.scrollBy({ left: containerWidth, behavior: 'smooth' });
    }
  }

  movePrev(): void {
    if (this.isBrowser && this.container) {
      const containerWidth = this.container.offsetWidth;
      this.container.scrollBy({ left: -containerWidth, behavior: 'smooth' });
    }
  }
}
