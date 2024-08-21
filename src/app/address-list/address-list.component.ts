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
  productQuantities: number[] = [];

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

    this.route.queryParams.subscribe(params => {
      const ids = params['ids'];
      const quantities = params['quantities'];

      if (ids && quantities) {
        this.productIds = ids.split(',').map((id: string) => +id);
        this.productQuantities = quantities.split(',').map((qty: string) => +qty);

        console.log('Received product IDs:', this.productIds);
        console.log('Received product quantities:', this.productQuantities);

        // Fetch products from both products.json and shineproduct.json
        this.productService.getProductsFromBothSources().subscribe(products => {
          this.product = products.filter(p => this.productIds.includes(p.id));
          this.product.forEach((product: any, index: number) => {
            product.quantity = this.productQuantities[index];
          });
        });
      }
    });
  }

  selectAddress(address: Address) {
    this.addressService.selectAddress(address);
  }

  deliver(): void {
    if (this.selectedAddress) {
      if (this.productIds.length > 0) {
        const quantities = this.product.map((p: Product) => p.quantity).join(',');

        console.log('Proceeding to payment with product IDs:', this.productIds);
        console.log('Proceeding to payment with quantities:', quantities);

        this.router.navigate(['/payment'], { 
          queryParams: { 
            ids: this.productIds.join(','), 
            quantities: quantities 
          }
        });
      } else {
        console.error('No products selected.');
      }
    } else {
      console.error('No address selected.');
    }
  }
}
