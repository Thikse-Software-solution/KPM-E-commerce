import { Injectable } from '@angular/core';
import { User,Order } from '../services/user-profile.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {
    id: 1,
    name: 'Thikse',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    avatarUrl: '../../assets/images/profile/user-image.jpeg',
    orderHistory: [
      { orderId: 101, product: 'Laptop', date: '2024-01-15', amount: 1200 },
      { orderId: 102, product: 'Headphones', date: '2024-02-10', amount: 200 },
      { orderId: 103, product: 'Smartphone', date: '2024-03-05', amount: 800 }
    ]
  };

  getUser(): Observable<User> {
    return of(this.user);
  }
  updateUser(updatedUser: User): void {
  this.user = { ...this.user, ...updatedUser };
  console.log('User updated', this.user);
  // Implement logic to persist the updated user data
}
   signOut(): void {
    console.log('User signed out');
    // Implement sign-out logic here
  }
}
