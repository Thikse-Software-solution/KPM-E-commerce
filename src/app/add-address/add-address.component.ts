import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Address, AddressService } from '../services/address.service';
import { UserService } from '../services/user-profile.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent {
  newAddress: Address = {
    name: '',
    type: 'Home',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: ''
  };
  userId: number | null = null;

  constructor(
    private addressService: AddressService, 
    private router: Router,
    private userService: UserService  // Inject UserService to get the user ID
  ) {}

  ngOnInit(): void {
    // Fetch the user ID dynamically
    this.userService.getUserId().subscribe(id => {
      this.userId = id;
    });
  }

  addAddress() {
    if (this.userId) {
      this.addressService.addAddressByUserId(this.userId, this.newAddress).subscribe(
        () => {
          // Reset the address form after adding
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
          // Navigate to the address list or payment page after adding the address
          this.router.navigate(['/address-list']);
          // this.router.navigate(['sheshine/payment']);
        },
        (error) => {
          console.error('Error adding address:', error);
        }
      );
    } else {
      console.error('User ID is not available.');
    }
  }
}
