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
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products-component/products.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './cart/cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';





@NgModule({
  declarations: [
    AppComponent,
    SheshineComponent,
    ShineComponent,
    NavbarComponent,
    NavtabComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ProductsComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    ProductOrderComponent,
    ProductCardComponent,
    AddressListComponent,
    AddAddressComponent,
    PaymentComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
