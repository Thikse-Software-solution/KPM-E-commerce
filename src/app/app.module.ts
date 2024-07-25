import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SheshineComponent } from './sheshine/sheshine.component';
import { ShineComponent } from './shine/shine.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavtabComponent } from './navtab/navtab.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products-component/products.component';


@NgModule({
  declarations: [
    AppComponent,
    SheshineComponent,
    ShineComponent,
    NavbarComponent,
    NavtabComponent,
    HomeComponent,
    CartComponent,
    ContactComponent,
    AboutComponent,
    ProductsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
