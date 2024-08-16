import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SheshineComponent } from './sheshine/sheshine/sheshine.component';
import { NavbarComponent } from './sheshine/navbar/navbar.component';
import { NavtabComponent } from './sheshine/navtab/navtab.component';
import { HomeComponent } from './sheshine/home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './sheshine/products-component/products.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './cart/cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { ProductCardComponent } from './sheshine/product-card/product-card.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { TogglingComponent } from './sheshine/toggling/toggling.component';
import { ProductViewDetailsComponent } from './sheshine/product-view-details/product-view-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FeatureComponent } from './sheshine/feature/feature.component';
import { TrendingComponent } from './sheshine/trending/trending.component';
import { SpecialComponent } from './sheshine/special/special.component';
import { TestmonialComponent } from './sheshine/testmonial/testmonial.component';
import { CustomerComponent } from './sheshine/customer/customer.component';
import { FooterComponent } from './footer/footer.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShineCardComponent } from './shine/shine-card/shine-card.component';
import { ShineComponent } from './shine/shine/shine.component';
import { BabyCareComponent } from './shine/Baby-care/Baby-care.component';
import { BodyCareComponent } from './shine/Body-care/Body-care.component';
import { FaceCareComponent } from './shine/face-care/face-care.component';
import { HairCareComponent } from './shine/Hair-care/Hair-care.component';
import { NewLaunchesComponent } from './shine/New-Launches/New-Launches.component';
import { SkinCareComponent } from './shine/Skin-care/Skin-care.component';
import { ShineHomeComponent } from './shine/shine-home/shine-home.component';
import { ShineproductsComponent } from './shine/shineproducts/shineproducts.component';
import { PickProductComponent } from './shine/pick-product/pick-product.component';






@NgModule({
declarations: [
    AppComponent,
    SheshineComponent,
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
    PaymentComponent,
    TogglingComponent,
    ProductViewDetailsComponent,
    SearchBarComponent,
    FeatureComponent,
    TrendingComponent,
    SpecialComponent,
    TestmonialComponent,
    CustomerComponent,
    FooterComponent,
    OrderHistoryComponent,
    UserProfileComponent,
    ShineComponent,
    ShineCardComponent,
    BabyCareComponent,
    BodyCareComponent,
    FaceCareComponent,
    HairCareComponent,
    NewLaunchesComponent,
    SkinCareComponent,
    ShineHomeComponent,
    ShineproductsComponent,
    PickProductComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
     CommonModule,
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
