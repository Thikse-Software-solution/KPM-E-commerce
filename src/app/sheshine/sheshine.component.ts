import { Component } from '@angular/core';

@Component({
  selector: 'app-sheshine',
  templateUrl: './sheshine.component.html',
  styleUrl: './sheshine.component.scss'
})
export class SheshineComponent {
  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
    console.log('Menu active:', this.menuActive); // Debug log to check toggle functionality
  }
}
