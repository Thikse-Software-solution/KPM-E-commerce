import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';
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
  filteredProducts: any[] = [];
  private isBrowser: boolean;
  private container!: HTMLElement;
  private productList!: HTMLElement;
  animationPaused = false;
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
   selectedCategory: string = '';
   searchQuery: string = '';

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
      this.filterProductsByCategory();
    });
   
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

  filterProductsByCategory(): void {
    const uniqueCategories = new Set(this.products.map(product => product.category));
    this.filteredProducts = Array.from(uniqueCategories).map(category => 
      this.products.find(product => product.category === category)
    );
  }

  buyProduct(category: string): void {
     this.router.navigate(['products'], { queryParams: { category: category } });
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

  moveNext(): void {
    if (this.isBrowser && this.container) {
      const containerWidth = this.container.offsetWidth / 2; // Half to handle duplicated cards
      this.container.scrollBy({ left: containerWidth, behavior: 'smooth' });
    }
  }

  movePrev(): void {
    if (this.isBrowser && this.container) {
      const containerWidth = this.container.offsetWidth / 2; // Half to handle duplicated cards
      this.container.scrollBy({ left: -containerWidth, behavior: 'smooth' });
    }
  }

  onDragStart(event: MouseEvent): void {
    this.animationPaused = true;
    this.isDragging = true;
    this.startX = event.pageX - this.container.offsetLeft;
    this.scrollLeft = this.container.scrollLeft;
  }

  onDragEnd(): void {
    this.isDragging = false;
    setTimeout(() => {
      this.animationPaused = false;
    }, 3000); // Delay to resume animation after interaction
  }

  onDragMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.container.offsetLeft;
    const walk = (x - this.startX) * 2; // Adjust scroll speed
    this.container.scrollLeft = this.scrollLeft - walk;
  }
}
