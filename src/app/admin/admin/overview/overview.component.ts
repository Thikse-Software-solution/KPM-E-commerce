import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../../services/overview.service';
import { OverviewData } from '../../services/overview';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  overviewData: OverviewData | undefined;
totalSales: any;
newCustomers: any;
ordersCount: any;
recentOrders: any;

  constructor(private overviewService: OverviewService) { }

  ngOnInit(): void {
    this.overviewService.getOverview().subscribe(data => {
      this.overviewData = data;
    });
  }
}
