import { Address, AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { ProductService, Product } from '../sheshine/services/product.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, ElementRef, Renderer2,Input } from '@angular/core';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  addresses: Address[] = [];
  @Input() product: any;
  selectedAddress: Address | null = null;
  private isBrowser: boolean;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private productService: ProductService,
    private el: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
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
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === id);
    });
  }

  selectAddress(address: Address) {
    this.addressService.selectAddress(address);
  }

  deliverHere(id:number):void {
    
    this.router.navigate(['/payment', id]);
  }
}
