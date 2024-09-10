import { Component, EventEmitter, Output } from '@angular/core';
// import { Router } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SharedService } from '../../services/shared.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.component.html',
  styleUrl: './navtab.component.scss'
})
export class NavtabComponent {
  searchQuery: string = '';
  cartItemCount: number = 0;
  showNavbar: boolean = true;
  showKpnRunner: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService, private sharedService: SharedService) {
  }
  




 

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

   onproduct(): void {
  const currentRoute = this.router.url.split('?')[0];  // Strip query parameters

  console.log('Current route:', currentRoute);  // Debug log to verify current route

  if (currentRoute === '/shine/shinehome') {
    console.log('Navigating to products page with search:', this.searchQuery);  // Debug log
    this.router.navigate(['/shine/shineproducts'], { queryParams: { search: this.searchQuery } });
  }
     else if (currentRoute === '/sheshine/home') {
    console.log('Navigating to products page with search:', this.searchQuery);  // Debug log
    this.router.navigate(['/sheshine/products'], { queryParams: { search: this.searchQuery } });
  }
  else {
    console.log('Applying search within the current page:', this.searchQuery);  // Debug log
    this.router.navigate([], {
      queryParams: { search: this.searchQuery },
      relativeTo: this.route
    });
  }
}


   onSearchChange() {
    this.sharedService.changeSearchQuery(this.searchQuery);
  }

  



    ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Toggle visibility of navbar and kpnrunner based on route
        const hiddenRoutes = ['/address', '/payment', '/cart', '/login', '/signup', '/toggle'];
        this.showNavbar = !hiddenRoutes.some(route => event.url.includes(route));
        this.showKpnRunner = !event.url.includes('/toggle');
      }
    });

    // this.cartService.cartItems$.subscribe((items) => {
    //   this.cartItemCount = items.length;
    // });
  }


  // closeNavbar() {
  //   const navbarCollapse = document.getElementById('navbarNav');
  //   if (navbarCollapse && navbarCollapse.classList.contains('show')) {
  //     navbarCollapse.classList.remove('show');
  //   }
  // }
  
  

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user; // Returns true if user data exists in localStorage, otherwise false
  }
 

}