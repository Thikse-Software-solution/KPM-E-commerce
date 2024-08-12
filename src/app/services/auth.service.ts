import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//  private readonly demoUsername = 'demo';
//   private readonly demoPassword = 'demo';
//   private loggedIn = false;

//   constructor(private router: Router) { }

//   login(username: string, password: string): boolean {
//     if (username === this.demoUsername && password === this.demoPassword) {
//       this.loggedIn = true;
//       return true;
//     } else {
//       return false;
//     }
//   }

//   isLoggedIn(): boolean {
//     return this.loggedIn;
//   }

//   logout() {
//     this.loggedIn = false;
//     this.router.navigate(['/login']);
//   }




  private apiUrl = 'https://your-backend-api.com/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}
