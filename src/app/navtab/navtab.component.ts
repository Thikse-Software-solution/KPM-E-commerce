import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.component.html',
  styleUrl: './navtab.component.scss'
})
export class NavtabComponent {
  constructor(private router: Router) {}

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
