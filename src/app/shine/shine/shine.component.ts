import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shine',
  templateUrl: './shine.component.html',
  styleUrls: ['./shine.component.scss']
})
export class ShineComponent  {

 constructor(private router: Router) {}

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}
