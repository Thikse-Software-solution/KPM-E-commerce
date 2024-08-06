import { TrendingService } from './../services/trending.service';
// src/app/card/card.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  trends: any[] = [];

  constructor(private TrendingService: TrendingService) {}

  ngOnInit(): void {
    this.TrendingService.getCards().subscribe(data => {
      this.trends = data;

    });
  }
}
