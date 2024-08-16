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
    const id = +this.route.snapshot.paramMap.get('id')!;
    const ids = this.route.snapshot.queryParamMap.get('ids');

    if (ids) {
      const productIds = ids.split(',').map((id: string) => +id);
      this.productService.getProducts().subscribe(products => {
        this.products = products.filter(p => productIds.includes(p.id));
        this.calculateTotalAmount();
      });
    } else {
      this.productService.getProducts().subscribe(products => {
        const product = products.find(p => p.id === id);
        if (product) {
          this.products = [product]; // Convert to array for consistent handling
          this.calculateTotalAmount();
        }
      });
    }

    this.addressService.getSelectedAddress().subscribe(address => {
      this.selectedAddress = address;
    });
  }

calculateTotalAmount(): void {
  console.log('Products:', this.products); // Log products to verify
  this.totalAmount = this.products.reduce((acc, product) => acc + product.price, 0);
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
