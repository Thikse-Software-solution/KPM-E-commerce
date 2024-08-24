import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OverviewData } from './overview';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  private apiUrl = 'http://localhost:8080/overview';

  constructor(private http: HttpClient) { }

  getOverview(): Observable<OverviewData> {
    return this.http.get<OverviewData>(this.apiUrl);
  }
}
