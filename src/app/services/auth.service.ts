import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

 login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Store the JWT token
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
