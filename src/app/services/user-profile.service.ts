// import { Injectable } from '@angular/core';
// import { User,Order } from './user-profile.model';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   // private user: User = {
//   //   id: 1,
//   //   name: 'Thikse',
//   //   email: 'johndoe@example.com',
//   //   phone: '123-456-7890',
//   //   address: '123 Main St, Anytown, USA',
//   //   avatarUrl: '../../assets/images/profile/user-image.jpeg',
//   //   orderHistory: [
//   //     { orderId: 101, product: 'Laptop', date: '2024-01-15', amount: 1200 },
//   //     { orderId: 102, product: 'Headphones', date: '2024-02-10', amount: 200 },
//   //     { orderId: 103, product: 'Smartphone', date: '2024-03-05', amount: 800 }
//   //   ]
//   // };
//   private apiUrl = 'http://localhost:8080/api/users';

//   getUser(): Observable<User> {
//     return of(this.user);
//   }
//   user(user: any): Observable<User> {
//     throw new Error('Method not implemented.');
//   }
//   updateUser(updatedUser: User): void {
//   this.user = { ...this.user, ...updatedUser };
//   console.log('User updated', this.user);
//   // Implement logic to persist the updated user data
// }
//    signOut(): void {
//     console.log('User signed out');
//     // Implement sign-out logic here
//   }
// }





import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private apiUrl = 'http://localhost:8080/api/users';
  private user: User | null = null;

  constructor(private http: HttpClient) {}

  // Fetch the user profile by ID from the backend
   getUserProfileById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
   updateUser(updatedUser: User): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/${updatedUser.id}`, updatedUser)
    .pipe(
      tap(updatedUser => {
        this.user = updatedUser; // Update the local user instance if necessary
      }),
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
}


  // Sign out the user
  signOut(): void {
    this.user = null;
    console.log('User signed out');
    // Implement any additional sign-out logic here, such as clearing tokens
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.user !== null;
  }
}
