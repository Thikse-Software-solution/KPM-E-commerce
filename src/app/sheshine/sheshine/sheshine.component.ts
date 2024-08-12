import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sheshine',
  templateUrl: './sheshine.component.html',
  styleUrl: './sheshine.component.scss'
})

export class SheshineComponent {
  constructor(private router: Router) {}

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}
// export class SheshineComponent {
//   menuActive = false;

//   toggleMenu() {
//     this.menuActive = !this.menuActive;
//     console.log('Menu active:', this.menuActive); // Debug log to check toggle functionality
//   }
// }
