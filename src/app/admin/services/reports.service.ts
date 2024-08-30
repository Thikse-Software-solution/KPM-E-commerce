import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsReportService {
  private baseUrl = 'http://localhost:8080/api/analytics/report';

  constructor(private http: HttpClient) { }

  getAnalyticsReport(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
