import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../services/customer'; // Adjust path as necessary

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:8080/api/feedbacks'; // Adjust URL

  constructor(private http: HttpClient) {}

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}`);
  }

  approveFeedback(feedbackId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/approve`, { feedbackId });
  }
}
