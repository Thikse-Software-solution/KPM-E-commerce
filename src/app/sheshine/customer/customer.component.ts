import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  testimonials: any[] = [];
  activeIndex = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchTestimonials();
  }

  fetchTestimonials() {
    this.http.get<any[]>('../../assets/data/testimonials.json').subscribe(
      data => {
        this.testimonials = data;
      },
      error => {
        console.error('Error fetching testimonials', error);
      }
    );
  }

  prev() {
    this.activeIndex = (this.activeIndex > 0) ? this.activeIndex - 1 : this.testimonials.length - 1;
  }

  next() {
    this.activeIndex = (this.activeIndex < this.testimonials.length - 1) ? this.activeIndex + 1 : 0;
  }
}
