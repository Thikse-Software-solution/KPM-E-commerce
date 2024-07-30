import { Component, OnInit } from '@angular/core';
import { Address, AddressService } from '.././services/address.service';
import { Product, ProductService } from '../product.service';

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
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.addressService.getSelectedAddress().subscribe(address => {
      this.selectedAddress = address;
    });
    this.productService.getProduct().subscribe(product => {
      this.product = product;
      if (product) {
        this.productAmount = product.price;
      }
    });
  }
}
