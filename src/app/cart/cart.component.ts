import { Component, OnInit, Input } from '@angular/core';
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
    // Subscribe to cart items and update total amount
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalAmount();
    });
    

    // Subscribe to cart item count
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });

    // Fetch product details based on the route parameter
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === id);
      console.log('Product loaded:', this.product);
    });
  }

  // Method to calculate total amount in the cart
 calculateTotalAmount() {
  this.totalAmount = this.cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
}

  // Method to remove item from the cart
  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.calculateTotalAmount();
    console.log('Item removed from cart:', item);
  }

  // Method to handle the "Buy Now" action
  // buyNow(id: number) {
  //   console.log('Navigating to address-list with id:', id);
  //   this.router.navigate(['/address-list', id])
  //     .then(success => {
  //       if (success) {
  //         console.log('Navigation successful!');
  //       } else {
  //         console.error('Navigation failed!');
  //       }
  //     });
  // }

//  buyNow(id: number) {
//    if (id) {
//       console.log('Navigating to address-list with id:', id);
//       this.router.navigate(['/address-list', id])
//          .then(success => {
//             if (success) {
//                console.log('Navigation successful!');
//             } else {
//                console.error('Navigation failed!');
//             }
//          });
//    } else {
//       console.error('Product ID is undefined');
//    }
  // }
  buyAll() {
   if (this.cartItems.length > 0) {
      const productIds = this.cartItems.map(item => item.id);
      console.log('Navigating to address-list with product IDs:', productIds);

      // Pass the array of IDs to the next route
      this.router.navigate(['/address-list'], { queryParams: { ids: productIds.join(',') } })
         .then(success => {
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
}
