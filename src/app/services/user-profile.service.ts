import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
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

  // Update user profile
  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${updatedUser.id}`, updatedUser)
      .pipe(
        tap(updatedUser => {
          this.user = updatedUser; // Update the local user instance if necessary
          console.log('User updated:', this.user);
        }),
        catchError(error => {
          console.error('Error updating user:', error);
          return throwError(error);
        })
      );
  }

  // Retrieve user ID dynamically
 getUserId(): Observable<number | null> {
  const userId = localStorage.getItem('userId');
  console.log('Retrieved userId from localStorage:', userId);
  return of(userId ? parseInt(userId, 10) : null);
}
  // Sign out the user
  signOut(): void {
    this.user = null;
    localStorage.removeItem('userId'); // Clear the user ID from storage if needed
    console.log('User signed out');
    // Implement any additional sign-out logic here, such as clearing tokens
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.user !== null;
  }
}
