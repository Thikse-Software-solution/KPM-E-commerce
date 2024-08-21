import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

 login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
           this.isAuthenticated = true; // Store the JWT token
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
    
  }

   logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  
  

}
