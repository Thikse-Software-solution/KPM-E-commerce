import { Component, OnInit } from '@angular/core';
import { Address, AddressService } from '../services/address.service';
import { Product, ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selectedAddress: Address | null = null;
  product: Product | null = null;
  productAmount: number = 0;
  products: any[] = [];
  

  constructor(
    private addressService: AddressService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.addressService.getSelectedAddress().subscribe(address => {
      this.selectedAddress = address;
    });

    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === id) || null;
      if (this.product) {
        this.productAmount = this.product.price;
      }
    });
  }
}
