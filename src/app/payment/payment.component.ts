import { Component, OnInit } from '@angular/core';
import { Address, AddressService } from '../services/address.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selectedAddress: Address | null = null;
  product: Product | null = null;
  productAmount: number = 0;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = +params['productId'];
      if (productId) {
        this.productService.getProductById(productId).subscribe(product => {
          this.product = product;
          this.productAmount = product.price;
        });
      }
    });

    this.addressService.getSelectedAddress().subscribe(address => {
      this.selectedAddress = address;
    });
  }
}
