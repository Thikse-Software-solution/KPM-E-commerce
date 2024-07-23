// nav-bar.component.ts
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  menuActive = false;
  hideNavBar = false;

  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    this.navbarService.hideNavBar$.subscribe((hide) => {
      this.hideNavBar = hide;
    });
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
    console.log('hello'); // Debug log to check toggle functionality
  }
}
