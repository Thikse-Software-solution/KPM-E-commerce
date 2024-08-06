import { Address, AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  addresses: Address[] = [];
  product: Product | null = null;
  selectedAddress: Address | null = null;
  private isBrowser: boolean;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private productService: ProductService,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });
    this.addressService.getSelectedAddress().subscribe(address => {
      this.selectedAddress = address;
    });
    this.productService.getProduct().subscribe(data => {
      this.product = data;
    });
  }

  selectAddress(address: Address) {
    this.addressService.selectAddress(address);
  }

  deliverHere() {
    if (this.product) {
      this.router.navigate(['/payment'], { queryParams: { productId: this.product.id } });
    }
  }
}
