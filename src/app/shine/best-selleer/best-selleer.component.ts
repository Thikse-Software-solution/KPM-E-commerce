import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-best-selleer',
  templateUrl: './best-selleer.component.html',
  styleUrls: ['./best-selleer.component.scss']
})
export class BestSelleerComponent implements OnInit, OnDestroy {
  images = [
    'assets/images/shine/slide/slide1.webp',
    'assets/images/shine/slide/slide2.webp',
    'assets/images/shine/slide/slide1.webp',
    'assets/images/shine/slide/slide2.webp',
    'assets/images/shine/slide/slide1.webp',
    'assets/images/shine/slide/slide2.webp',
    'assets/images/shine/slide/slide1.webp',
    'assets/images/shine/slide/slide2.webp',
    'assets/images/shine/slide/slide1.webp',
    'assets/images/shine/slide/slide2.webp',
    // 'assets/image2.jpg',
    // 'assets/image3.jpg',
    // 'assets/image4.jpg',
    // 'assets/image5.jpg',
    // 'assets/image6.jpg',
    // 'assets/image7.jpg',
    // 'assets/image8.jpg',
    // 'assets/image9.jpg',
    // 'assets/image10.jpg',
  ];

  currentIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000); // Change slide every 2 seconds
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    clearInterval(this.intervalId); // Stop auto-slide when clicked
    this.startAutoSlide(); // Restart auto-slide
  }
}


