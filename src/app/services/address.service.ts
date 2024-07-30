import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Address {
  id?: number;
  name: string;
  type: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressesSubject: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);
  public addresses$: Observable<Address[]> = this.addressesSubject.asObservable();
  
  private selectedAddressSubject: BehaviorSubject<Address | null> = new BehaviorSubject<Address | null>(null);
  public selectedAddress$: Observable<Address | null> = this.selectedAddressSubject.asObservable();

  constructor() {
    const initialAddresses: Address[] = [
      { id: 1, name: 'Poovarasan S', type: 'HOME', phone: '9597258671', addressLine1: 'Throwpathi amman kovil st', addressLine2: 'Kalijikuppam', city: 'Viluppuram District', state: 'Tamil Nadu', zip: '607104' },
      { id: 2, name: 'Gokul M', type: 'HOME', phone: '8681907138', addressLine1: 'Throw pathy amman kovil street', addressLine2: 'Kalijikuppam', city: 'Viluppuram District', state: 'Tamil Nadu', zip: '607104' },
      { id: 3, name: 'Aravind', type: 'HOME', phone: '6369426151', addressLine1: 'No:1, gandhinagar', addressLine2: 'Rampakkam, Main road', city: 'Viluppuram District', state: 'Tamil Nadu', zip: '605105' },
    ];
    this.addressesSubject.next(initialAddresses);
  }

  addAddress(address: Address) {
    const currentAddresses = this.addressesSubject.value;
    address.id = currentAddresses.length ? Math.max(...currentAddresses.map(a => a.id || 0)) + 1 : 1;
    this.addressesSubject.next([...currentAddresses, address]);
  }

  selectAddress(address: Address) {
    this.selectedAddressSubject.next(address);
  }

  getAddresses(): Observable<Address[]> {
    return this.addresses$;
  }

  getSelectedAddress(): Observable<Address | null> {
    return this.selectedAddress$;
  }
}
