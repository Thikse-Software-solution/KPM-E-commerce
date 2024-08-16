import { Address, AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { ProductService, Product } from '../sheshine/services/product.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, ElementRef, Renderer2, Input } from '@angular/core';

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
  productIds: number[] = [];

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
    // Fetch addresses and selected address
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });
    this.addressService.getSelectedAddress().subscribe(address => {
      this.selectedAddress = address;
    });

    // Fetch the current product and product IDs
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === id);
    });
    this.route.queryParams.subscribe(params => {
      const ids = params['ids'];
      if (ids) {
        this.productIds = ids.split(',').map((id: string) => +id);
        console.log('Received product IDs:', this.productIds);
      }
    });
  }

  selectAddress(address: Address) {
    this.addressService.selectAddress(address);
  }

  // Unified method to handle delivery for single or multiple products
  deliver(): void {
    if (this.selectedAddress) {
      if (this.productIds.length > 0) {
        // Navigate with multiple product IDs
        console.log('Proceeding to payment with product IDs:', this.productIds);
        this.router.navigate(['/payment'], { queryParams: { ids: this.productIds.join(',') } });
      } else if (this.product) {
        // Navigate with a single product ID
        console.log('Proceeding to payment with single product ID:', this.product.id);
        this.router.navigate(['/payment', this.product.id]);
      } else {
        console.error('No products selected.');
      }
    } else {
      console.error('No address selected.');
    }
  }
}
