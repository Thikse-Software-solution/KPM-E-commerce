// src/app/reports/reports.component.ts

import { Component, OnInit } from '@angular/core';
import { AnalyticsReportService } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports-analytics.component.html',
  styleUrls: ['./reports-analytics.component.scss']
})
export class ReportsAnalyticsComponent implements OnInit {
  report: any;

  constructor(private analyticsReportService: AnalyticsReportService) { }

  ngOnInit(): void {
    this.analyticsReportService.getAnalyticsReport().subscribe(
      data => {
        console.log(data); // Check the data structure here
        this.report = data;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }
}
