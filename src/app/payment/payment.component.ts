import { Component, OnInit, Input } from '@angular/core';
import { Address, AddressService } from '../services/address.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../sheshine/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selectedAddress: Address | null = null;
  @Input() product:any;
  //  products: any[] = [];
  productAmount: number = 0;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === id);
      if (this.product) {
        this.calculateTotalAmount();
      }
    });
        
    

    this.addressService.getSelectedAddress().subscribe(address => {
      this.selectedAddress = address;
    });
  }
   calculateTotalAmount(): void {
    if (this.product) {
      
      this.productAmount = this.product.price;
    }
  }
}
