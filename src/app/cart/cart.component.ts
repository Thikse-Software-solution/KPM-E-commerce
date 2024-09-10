import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../sheshine/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  cartItemCount: number = 0;
  product: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalAmount();
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });

    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === id);
      console.log('Product loaded:', this.product);
    });
  }

  // Method to calculate the total amount in the cart based on quantity
  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((acc, item) => 
      acc + parseFloat(item.price) * (item.quantity || 1), 0);
  }

  // Method to remove an item from the cart
  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.calculateTotalAmount();
    console.log('Item removed from cart:', item);
  }

  // Method to handle the "Buy Now" action for all items
  buyAll() {
    if (this.cartItems.length > 0) {
      const productIds = this.cartItems.map(item => item.id);
      const quantities = this.cartItems.map(item => item.quantity || 1);

      console.log('Navigating to address-list with product IDs:', productIds);
      console.log('Product quantities:', quantities);

      this.router.navigate(['/address-list'], { 
        queryParams: { 
          ids: productIds.join(','), 
          quantities: quantities.join(',') 
        } 
      }).then(success => {
        if (success) {
          console.log('Navigation successful!');
        } else {
          console.error('Navigation failed!');
        }
      });
    } else {
      console.error('No items in the cart to buy.');
    }
  }

  // Method to increase the quantity of a product
  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.addToCart(item); // Automatically updates the cart
    this.calculateTotalAmount();
  }

  // Method to decrease the quantity of a product
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.addToCart(item); // Automatically updates the cart
      this.calculateTotalAmount();
    }
  }
}
