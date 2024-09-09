import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sheshine',
  templateUrl: './sheshine.component.html',
  styleUrls: ['./sheshine.component.scss']
})
export class SheshineComponent {
  navbarOpen = false;

  constructor(private router: Router) {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    } else {
      navbarCollapse?.classList.add('show');
    }
  }

  closeNavbar() {
    this.navbarOpen = false;  // Reset icon state
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}
