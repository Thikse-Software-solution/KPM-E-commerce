import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shine',
  templateUrl: './shine.component.html',
  styleUrls: ['./shine.component.scss']
})
export class ShineComponent  {

  isNavbarOpen = false;

  constructor(private router: Router) {}

  toggleNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
      this.isNavbarOpen = false;
    } else {
      navbarCollapse?.classList.add('show');
      this.isNavbarOpen = true;
    }
  }

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
      this.isNavbarOpen = false;
    }
  }
}
