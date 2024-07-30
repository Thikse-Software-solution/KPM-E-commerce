import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Address, AddressService } from '.././services/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent {
  newAddress: Address = {
    name: '',
    type: 'HOME',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: ''
  };

  constructor(private addressService: AddressService, private router: Router) { }

  addAddress() {
    this.addressService.addAddress(this.newAddress);
    this.newAddress = {
      name: '',
      type: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: ''
    };
    this.router.navigate(['/address-list']);
  }
}
