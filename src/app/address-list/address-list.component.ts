import { Component, OnInit } from '@angular/core';
import { Address, AddressService } from '.././services/address.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddress: Address | null = null;

  constructor(private addressService: AddressService,private router: Router) { }

  ngOnInit() {
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });
    this.addressService.getSelectedAddress().subscribe(address => {
      this.selectedAddress = address;
    });
  }

  selectAddress(address: Address) {
    this.addressService.selectAddress(address);
  }

  deliverHere() {
    if (this.selectedAddress) {
      // alert(`Deliver to: ${this.selectedAddress.name}, ${this.selectedAddress.addressLine1}, ${this.selectedAddress.city}`);
         this.router.navigate(['/payment']);
    }
  }
}
