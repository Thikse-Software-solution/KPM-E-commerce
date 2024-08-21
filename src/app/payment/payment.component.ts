import { Component, OnInit, Input } from '@angular/core';
import { Address, AddressService } from '../services/address.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../sheshine/services/product.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selectedAddress: Address | null = null;
  @Input() products: Product[] = []; // Array to handle multiple products
  totalAmount: number = 0;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      const ids = params['ids'];
      const quantities = params['quantities'];

      if (ids && quantities) {
        const productIds = ids.split(',').map((id: string) => +id);
        const productQuantities = quantities.split(',').map((qty: string) => +qty);

        // Fetch products from both sources
        this.loadProducts(productIds, productQuantities);
      } else if (id && params['quantity']) {
        const quantity = +params['quantity'];

        this.loadSingleProduct(id, quantity);
      }
    });

    this.addressService.getSelectedAddress().subscribe(address => {
      this.selectedAddress = address;
    });
  }

  private loadProducts(productIds: number[], productQuantities: number[]): void {
    const combinedProducts: Product[] = [];

    this.productService.getProducts().subscribe(products => {
      const filteredProducts = products.filter(p => productIds.includes(p.id));
      combinedProducts.push(...filteredProducts);
      this.updateQuantities(combinedProducts, productIds, productQuantities);

      this.productService.getShineProducts().subscribe(shineProducts => {
        const filteredShineProducts = shineProducts.filter(p => productIds.includes(p.id));
        combinedProducts.push(...filteredShineProducts);
        this.updateQuantities(combinedProducts, productIds, productQuantities);
        this.products = combinedProducts;
        this.calculateTotalAmount();
      });
    });
  }

  private loadSingleProduct(id: number, quantity: number): void {
    this.productService.getProducts().subscribe(products => {
      const product = products.find(p => p.id === id);
      if (product) {
        product.quantity = quantity;
        this.products.push(product);
        this.calculateTotalAmount();
      }

      this.productService.getShineProducts().subscribe(shineProducts => {
        const shineProduct = shineProducts.find(p => p.id === id);
        if (shineProduct) {
          shineProduct.quantity = quantity;
          this.products.push(shineProduct);
          this.calculateTotalAmount();
        }
      });
    });
  }

  private updateQuantities(products: Product[], productIds: number[], productQuantities: number[]): void {
    products.forEach((product, index) => {
      product.quantity = productQuantities[productIds.indexOf(product.id)];
    });
  }

  calculateTotalAmount(): void {
    console.log('Products:', this.products); // Log products to verify
    this.totalAmount = this.products.reduce((acc, product) => acc + (product.price * (product.quantity || 1)), 0);
    console.log('Total Amount:', this.totalAmount); // Log total amount to verify
  }

  onProceedToPay(): void {
    if (this.selectedAddress && this.products.length > 0) {
      const order = {
        products: this.products,
        address: this.selectedAddress,
        amount: this.totalAmount,
        date: new Date()
      };

      this.orderService.addOrder(order);
      this.router.navigate(['/order']);
    } else {
      console.error('No address or products selected.');
    }
  }
}
