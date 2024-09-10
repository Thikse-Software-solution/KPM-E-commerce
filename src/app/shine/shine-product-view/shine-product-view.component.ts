import { Component,HostListener , Inject, PLATFORM_ID, OnInit,OnDestroy,Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ShineProductService } from '../services/shine-product.service';
import { ProductService, Product} from '../../sheshine/services/product.service';
@Component({
  selector: 'app-shine-product-view',
  templateUrl: './shine-product-view.component.html',
  styleUrls: ['./shine-product-view.component.scss']
})
export class ShineProductViewComponent implements OnInit, OnDestroy {
  @Input() product: any;
  isFavorite: boolean = false;
  productDetails: any;
  quantity: number = 1;
  reviewText: string = '';
  reviews: string[] = [];
  private isBrowser: boolean;
  subcategoryProducts: any[] = [];
  colors: string[] = ['#000', '#EDEDED', '#D5D6D8', '#EFE0DE', '#AB8ED1', '#F04D44'];
  activeSections: boolean[] = [false, false, false, false];
  cards: Array<{ image: string; title: string; text: string }> = [];
  duplicatedCards: Array<{ image: string; title: string; text: string }> = [];
  cardWidth = 0;
  currentIndex = 0;
  interval!: ReturnType<typeof setInterval>;
  //3d image
 threeDImages:string[] = [];
  isDragging = false;
   imageIndex = 0;
  startX: number = 0;
    isMobile = false;

  constructor(
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private shineProductService: ShineProductService,
    private productService: ProductService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


   @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.isMobile = window.innerWidth <= 768;
  }
   isMobileView() {
    return this.isMobile;
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;

    this.cardWidth = this.calculateCardWidth();
    if (this.isBrowser) {
      this.startCarousel();
    }

    // this.route.params.subscribe(params => {
    //   const id = +params['id']; // Get the ID from the route
    //   this.productService.getShineProducts().subscribe((products: Product[]) => {
    //     const product = products.find(p => p.id === id);
    //     if (product && product.cards) {
    //       this.cards = product.cards;
    //     }
    //   });
    // });
    


    this.route.params.subscribe(params => {
      const id = +params['id']; // Get the ID from the route
      this.productService.getShineProducts().subscribe((products: Product[]) => {
        const product = products.find(p => p.id === id);
        if (product && product.cards) {
          this.cards = product.cards;
          this.duplicateCards();
        }
      });
    });


     this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.productService.getProductById(id).subscribe(product => {
          if (product) {
            this.product = product;
            this.threeDImages = product.threeDImages || [];
          }
        });
      }
    });
    






    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.shineProductService.getProductById(id).subscribe(product => {
          this.product = product;
          if (this.product) {
            if (typeof this.product.quantity !== 'number' || isNaN(this.product.quantity)) {
              this.product.quantity = 1;
            }
            if (this.product.subcategory) {
              this.fetchSubcategoryProducts(this.product.subcategory);
            }
          }
        });
      }
    });
  }

  fetchSubcategoryProducts(subcategory: string) {
    this.shineProductService.getProductsBySubcategory(subcategory).subscribe(products => {
      this.subcategoryProducts = products.filter(p => p.id !== this.product?.id); // Exclude the current product
    });
  }

  calculateCardWidth(): number {
     if (typeof window === 'undefined') {
    // Return a default value or handle the case where window is not available
    console.warn("Window object is not available.");
    return 0; // Default value
  }
    
    const screenWidth = window.innerWidth;

    if (screenWidth > 1024) {
      return screenWidth / 3; // 3 cards in view for laptop
    } else if (screenWidth >= 768) {
      return screenWidth / 2; // 2 cards in view for tablet
    } else {
      return screenWidth; // 1 card in view for mobile
    }
  }
  duplicateCards() {
    // Duplicate the cards to allow seamless scrolling
    this.duplicatedCards = [...this.cards, ...this.cards];
  }


  startCarousel() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    }, 3000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }




  changeImage(image: string) {
    if (this.product) {
      this.product.thumbnail = image;
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
    if (product) {
      product.rating = rating;
    }
  }

  increaseQuantity() {
    if (this.product) {
      this.product.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.product && this.product.quantity > 1) {
      this.product.quantity--;
    }
  }

  toggleFavorite(product: any) {
    this.isFavorite = !this.isFavorite;
  }

  submitReview() {
    if (this.reviewText.trim()) {
      this.reviews.unshift(this.reviewText);
      console.log(`Review submitted: ${this.reviewText}`);
      this.reviewText = '';
    } else {
      alert('Review cannot be empty.');
    }
  }

  buyNow(id: number): void {
    if (this.product) {
      this.product.quantity = 1; // Ensure quantity is set to 1 before navigating
      console.log('Navigating to address-list with product ID:', this.product.id);
      console.log('Product quantity:', this.product.quantity);

      this.router.navigate(['/address-list'], {
        queryParams: {
          ids: this.product.id,
          quantities: this.product.quantity
        }
      }).then(success => {
        if (success) {
          console.log('Navigation successful!');
        } else {
          console.error('Navigation failed!');
        }
      });
    }
  }

  addToCart(product: any) {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }

  toggleContent(index: number): void {
    this.activeSections[index] = !this.activeSections[index];
  }

  isActive(index: number): boolean {
    return this.activeSections[index];
  }

  getClass(index: number): string {
    return this.isActive(index) ? 'collapsible active' : 'collapsible';
  }

  viewProduct(subcategoryProduct: any): void {
    console.log('Product:', subcategoryProduct);
    console.log('Product ID:', subcategoryProduct.id);
    console.log('Navigating to product with ID:', subcategoryProduct.id);
    this.router.navigate(['/shine/view', subcategoryProduct.id]);
  }


  //3D image
  
  startRotation(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = this.isTouchEvent(event) ? event.touches[0].clientX : (event as MouseEvent).clientX;
  }
  
  rotateImage(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;

    const currentX = this.isTouchEvent(event) ? event.touches[0].clientX : (event as MouseEvent).clientX;
    const deltaX = this.startX - currentX;
    
    if (Math.abs(deltaX) > 10) {  // Adjust sensitivity
      if (deltaX > 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
      this.startX = currentX;
    }
  }
  
  stopRotation() {
    this.isDragging = false;
  }
  
  prevImage() {
    this.imageIndex = (this.imageIndex > 0) ? this.imageIndex - 1 : this.threeDImages.length - 1;
  }

  nextImage() {
    this.imageIndex = (this.imageIndex < this.threeDImages.length - 1) ? this.imageIndex + 1 : 0;
  }

  private isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return 'touches' in event;
  }


 
}





