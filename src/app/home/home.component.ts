// home.component.ts
import { Component } from '@angular/core';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private navbarService: NavbarService) {}

  clickOpen() {
    alert('Button Working');
    this.navbarService.hide();
  }
}
