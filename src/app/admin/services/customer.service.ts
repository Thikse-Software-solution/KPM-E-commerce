import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = `http://localhost:4200/api/admin/customers`;

  constructor(private http: HttpClient) { }

  sendOfferEmail(request: { customerId: number; offerMessage: string }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/send-offer-email`, request).pipe(
    );
    }

  sendCartReminder(request: CartReminderRequest): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/send-cart-reminder`, request);
  }

  getPendingReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/pending`);
  }

  approveReview(id: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/reviews/${id}/approve`, {});
  }
}

export interface OfferEmailRequest {
  subject: string;
  body: string;
  recipientEmails: string[];
  customerId: number;
  offerMessage: string;
}

export interface CartReminderRequest {
  reminderMessage: string;
  recipientEmails: string[];
}

export interface Review {
  id: number;
  content: string;
  approved: boolean;
}
