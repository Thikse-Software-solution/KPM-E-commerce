import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.component.html',
  styleUrl: './navtab.component.scss'
})
export class NavtabComponent {
  constructor(private router: Router) { }
  

  showNavbar: boolean = true;



 

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }




   ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/address', '/payment','/cart'];
        this.showNavbar = !hiddenRoutes.some(route => event.url.includes(route));
      }
    });
  }
}