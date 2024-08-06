import { Component, OnInit, AfterViewInit, OnDestroy, Inject, ElementRef, Renderer2, HostListener } from '@angular/core';
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
  private isDown = false;
  private startX!: number; // Definite assignment assertion
  private scrollLeft!: number; // Definite assignment assertion

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
    this.router.navigate(['/sheshine/view', product.id]);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      const container = this.el.nativeElement.querySelector('.card-container');
      if (container) {
        this.renderer.listen(container, 'mousedown', (e: MouseEvent) => this.onMouseDown(e, container));
        this.renderer.listen(container, 'mouseleave', () => this.onMouseLeave(container));
        this.renderer.listen(container, 'mouseup', () => this.onMouseUp(container));
        this.renderer.listen(container, 'mousemove', (e: MouseEvent) => this.onMouseMove(e, container));

        this.renderer.listen(container, 'touchstart', (e: TouchEvent) => this.onTouchStart(e, container));
        this.renderer.listen(container, 'touchend', () => this.onTouchEnd(container));
        this.renderer.listen(container, 'touchmove', (e: TouchEvent) => this.onTouchMove(e, container));
      }
    }
  }

  ngOnDestroy(): void {
    // Cleanup logic if needed
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

  onMouseDown(e: MouseEvent, container: HTMLElement): void {
    this.isDown = true;
    container.classList.add('active');
    this.startX = e.pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;
  }

  onMouseLeave(container: HTMLElement): void {
    this.isDown = false;
    container.classList.remove('active');
  }

  onMouseUp(container: HTMLElement): void {
    this.isDown = false;
    container.classList.remove('active');
  }

  onMouseMove(e: MouseEvent, container: HTMLElement): void {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - this.startX) * 2; // Scroll-fast
    container.scrollLeft = this.scrollLeft - walk;
  }

  onTouchStart(e: TouchEvent, container: HTMLElement): void {
    this.isDown = true;
    container.classList.add('active');
    this.startX = e.touches[0].pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;
  }

  onTouchEnd(container: HTMLElement): void {
    this.isDown = false;
    container.classList.remove('active');
  }

  onTouchMove(e: TouchEvent, container: HTMLElement): void {
    if (!this.isDown) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - this.startX) * 2; // Scroll-fast
    container.scrollLeft = this.scrollLeft - walk;
  }
}
