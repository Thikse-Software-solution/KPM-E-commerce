import { Component, OnInit, Inject, ElementRef, Renderer2, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../sheshine/services/product.service';
import { AddressService } from '../services/address.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../services/address.model';
import { UserService } from '../services/user-profile.service'; // Assuming you have a UserService

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  addresses: Address[] = [];
  @Input() product: Product[] = [];
  selectedAddress: Address | null = null;
  private isBrowser: boolean;
  productIds: number[] = [];
  productQuantities: number[] = [];
  userId: number | null = null;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private productService: ProductService,
    private el: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private userService: UserService, // Assuming you have a UserService
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Fetch the user ID dynamically
    this.userService.getUserId().subscribe(userId => {
      if (userId !== null && userId !== undefined) {
        console.log('User ID fetched successfully:', userId);
        this.userId = userId;

        // Now that userId is available, load the addresses and selected address
        this.loadAddresses();
        this.loadSelectedAddress();
      } else {
        console.error('User ID is not available.');
      }
    });

    // Load products from route parameters
    this.loadProductsFromRouteParams();
  }

  private loadAddresses(): void {
    if (this.userId !== null) {
      console.log('Loading addresses for user ID:', this.userId);
      this.addressService.getAddressesByUserId(this.userId).subscribe(
        (addresses: Address[]) => {
          this.addresses = addresses;
          console.log('Addresses loaded:', addresses);
        },
        error => {
          console.error('Error loading addresses:', error);
        }
      );
    } else {
      console.error('User ID is not available for loading addresses.');
    }
  }
 
  private loadProductsFromRouteParams(): void {
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
          this.product.forEach((product: Product, index: number) => {
            product.quantity = this.productQuantities[index];
          });
        });
      }
    });
  }

  private loadSelectedAddress(): void {
    if (this.userId !== null) {
      console.log('Loading selected address for user ID:', this.userId);
      this.addressService.getSelectedAddress(this.userId).subscribe(
        address => {
          this.selectedAddress = address;
          console.log('Selected address loaded:', address);
        },
        error => {
          console.error('Error loading selected address:', error);
        }
      );
    } else {
      console.error('User ID is not available for loading selected address.');
    }
  }

  selectAddress(address: Address): void {
    this.addressService.selectAddress(address);
    this.selectedAddress = address;
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
