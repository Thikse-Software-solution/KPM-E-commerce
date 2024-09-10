import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        // Store user information and user ID in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', user.id.toString()); // Ensure `user.id` is the correct property

        this.isAuthenticated = true;
        console.log('Login successful:', user);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error); // Handle login errors
      })
    );
  }

  signup(signupData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, signupData);
  }

  forgotPassword(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.apiUrl}/forgot-password`, null, { params });
  }

  resetPassword(data: { email: string, newPassword: string }): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('newPassword', data.newPassword);
    return this.http.put<any>(`${this.apiUrl}/reset-password`, null, { params });
  }

  // Method to get the current user's ID from the stored token
  getCurrentUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId'); // Check if userId is available in localStorage
  }

  signOut(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
