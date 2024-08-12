import { Component, OnInit, AfterViewInit, OnDestroy, Inject, ElementRef, Renderer2 } from '@angular/core';
import { ProductService } from '../services/product.service';
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
  filteredProducts: any[] = [];
  private container!: HTMLElement;
  private productList!: HTMLElement;
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  private isBrowser: boolean;

  constructor(
    private productService: ProductService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = this.products; // Initially show all products
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.container = this.el.nativeElement.querySelector('.card-container');
      this.productList = this.el.nativeElement.querySelector('.product-list');
    }
  }

  ngOnDestroy(): void {
    // Cleanup logic if needed
  }

  onDragStart(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.pageX - this.container.offsetLeft;
    this.scrollLeft = this.container.scrollLeft;
  }

  onDragEnd(): void {
    this.isDragging = false;
  }

  onDragMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.container.offsetLeft;
    const walk = (x - this.startX) * 2; // Adjust scroll speed
    this.container.scrollLeft = this.scrollLeft - walk;
  }

  showCategoryProducts(category: string, productId: number): void {
    this.router.navigate(['/products'], { queryParams: { category: category, productId: productId } });
  }
}
