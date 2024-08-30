import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

login(identifier: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { identifier, password }).pipe(
      tap(user => {
        // Store user information or handle login success
          localStorage.setItem('user', JSON.stringify(user));

     
        this.isAuthenticated = true;
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
  
  
  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, credentials);
  // }
  // Method to get the current user's ID from the stored token
  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.userId; // Replace with the correct field name from your token payload
    }
    return null;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Failed to decode token:', e);
      return null;
    }
  }









//  login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
//       tap(response => {
//         localStorage.setItem('token', response.token);
//            this.isAuthenticated = true; // Store the JWT token
//       })
//     );
//   }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
    
  }

   signOut(): void {
    localStorage.removeItem('token');
     this.isAuthenticated = false;
     localStorage.removeItem('user');
  }

  

}
