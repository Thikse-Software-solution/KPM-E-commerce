import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.component.html',
  styleUrl: './navtab.component.scss'
})
export class NavtabComponent {

  cartItemCount: number = 0;
  constructor(private router: Router,private cartService: CartService) { }
  

  showNavbar: boolean = true;



 

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }




   ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/address', '/payment','/cart','/login','/signup','/toggle'];
        this.showNavbar = !hiddenRoutes.some(route => event.url.includes(route));
      }
    });
     this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }
}