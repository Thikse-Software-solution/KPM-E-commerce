import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private apiUrl = 'https://your-backend-api.com/contact'; // Replace with your actual backend API endpoint

  constructor(private http: HttpClient) {}

  // Method to send contact form data to the server
  sendContactForm(contactData: any): Observable<any> {
    return this.http.post(this.apiUrl, contactData);
  }
}
