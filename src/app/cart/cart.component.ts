import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../sheshine/services/product.service';
import { CartItem } from '../services/cart.service'; // Import CartItem interface
import { Product } from '../admin/services/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Use CartItem interface
  totalAmount: number = 0;
  cartItemCount: number = 0;
  product: any;
  userId: number | null = null;
  

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Retrieve userId from local storage
    this.loadUserIdFromLocalStorage();

    // Fetch cart items only if userId is available
    if (this.userId !== null) {
      this.getCartItems();
    } else {
      console.error('User ID not found in local storage.');
    }

    // Fetch product details if an ID is present in the route
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.productService.getProducts().subscribe(products => {
        this.product = products.find(p => p.id === id);
        console.log('Product loaded:', this.product);
      });
    }
  }

  // Load userId from local storage
  loadUserIdFromLocalStorage() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.userId = user.id; // Extract userId from parsed user data
        console.log('User ID loaded from local storage:', this.userId);
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    } else {
      console.error('No user data found in local storage.');
    }
  }

  getCartItems() {
  console.log('Fetching cart items for user:', this.userId); // Debug userId
  
  // Check if the userId is available
  if (this.userId !== null) {
    this.cartService.getCartItems(this.userId).subscribe(
      items => {
        // Log the received cart items
        console.log('Cart items received:', items); // Debug received items
        this.cartItems = items;
        this.cartItemCount = items.length;

        // Log the cartItems after assignment to ensure they are correctly updated
        console.log('Updated cartItems:', this.cartItems);
        

        // Calculate the total amount
        this.calculateTotalAmount();

        // Log the total amount for additional verification
        console.log('Total amount after calculation:', this.totalAmount);
      },
      error => {
        // Log any error that occurs during the fetching process
        console.error('Error fetching cart items:', error); // Debug error
      }
    );
  } else {
    // Warn if userId is null, indicating that cart items cannot be fetched
    console.warn('User ID is null. Cannot fetch cart items.'); // Debug if userId is null
  }
}

  // Method to calculate the total amount in the cart based on quantity
calculateTotalAmount() {
  this.totalAmount = this.cartItems.reduce((acc, item) => {
    // Check if item and item.price are defined
    if (item && item.product.price != null) {
      return acc + parseFloat(item.product.price.toString()) * (item.quantity || 1);
    } else {
      console.warn('Item or price is undefined:', item); // Log the problematic item
      return acc; // Skip the item with undefined price
    }
  }, 0);
  console.log('Total amount after calculation:', this.totalAmount);
}
  // Method to remove an item from the cart
  removeFromCart(item: CartItem) {
    this.cartService.removeCartItem(item.id).subscribe(() => {
      this.getCartItems(); // Refresh cart items after removal
      console.log('Item removed from cart:', item);
    }, error => {
      console.error('Error removing item from cart:', error);
    });
  }

// Method to handle the "Buy Now" action for all items
buyAll() {
  if (this.cartItems.length > 0) {
    const productIds = this.cartItems.map(item => item.product.id);
    const quantities = this.cartItems.map(item => item.quantity || 1);

    // Convert arrays to comma-separated strings
    const productIdsString = productIds.join(',');
    const quantitiesString = quantities.join(',');

    console.log('Navigating to address-list with product IDs:', productIdsString);
    console.log('Product quantities:', quantitiesString);

    // Navigate to the address-list component with query parameters for product IDs and quantities
    this.router.navigate(['/address-list'], {
      queryParams: {
        ids: productIdsString,
        quantities: quantitiesString
      }
    }).then(success => {
      if (success) {
        console.log('Navigation successful!');
      } else {
        console.error('Navigation failed!');
      }
    }).catch(error => {
      console.error('Error during navigation:', error);
    });
  } else {
    console.error('No items in the cart to buy.');
  }
}
  // Method to increase the quantity of a product
 // cart.component.ts
increaseQuantity(item: CartItem) {
  item.quantity++;
  
  // Check if userId, productId, and quantity are valid before making the API call
  if (this.userId !== null && item.product.id !== undefined && item.quantity !== undefined) {
    this.cartService.addOrUpdateCartItem(this.userId, item.product.id, item.quantity).subscribe(
      () => {
        this.calculateTotalAmount();
        console.log('Quantity increased for item:', item);
      },
      error => {
        console.error('Error increasing quantity:', error);
      }
    );
  } else {
    console.error('Invalid item or userId:', { userId: this.userId, item });
  }
}

 // Method to decrease the quantity of a product
  decreaseQuantity(item: CartItem) {
    if (item.quantity && item.quantity > 1) { // Only decrease if quantity is greater than 1
      item.quantity--;
      if (this.userId !== null && item.product.id !== undefined) {
        this.cartService.addOrUpdateCartItem(this.userId, item.product.id, item.quantity).subscribe(
          () => {
            this.calculateTotalAmount();
            console.log('Quantity decreased for item:', item);
          },
          error => {
            console.error('Error decreasing quantity:', error);
          }
        );
      } else {
        console.error('Invalid item or userId:', { userId: this.userId, item });
      }
    }
  }
}

