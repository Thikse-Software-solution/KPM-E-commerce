import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth.guard';

import { RouterModule, Routes } from '@angular/router';
import { SheshineComponent } from './sheshine/sheshine/sheshine.component';
import { HomeComponent } from './sheshine/home/home.component';
import { ProductsComponent } from './sheshine/products-component/products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { ProductCardComponent } from './sheshine/product-card/product-card.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { PaymentComponent } from './payment/payment.component';
import { TogglingComponent } from './sheshine/toggling/toggling.component';
import { ProductViewDetailsComponent } from './sheshine/product-view-details/product-view-details.component';
import { Router, NavigationEnd } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShineComponent } from './shine/shine/shine.component';
import { ShineHomeComponent } from './shine/shine-home/shine-home.component';
import { BodyCareComponent } from './shine/Body-care/Body-care.component';
import { BabyCareComponent } from './shine/Baby-care/Baby-care.component';
import { FaceCareComponent } from './shine/face-care/face-care.component';
import { HairCareComponent } from './shine/Hair-care/Hair-care.component';
import { SkinCareComponent } from './shine/Skin-care/Skin-care.component';
import { NewLaunchesComponent } from './shine/New-Launches/New-Launches.component';
import { ShineproductsComponent } from './shine/shineproducts/shineproducts.component';
import { ShineProductViewComponent } from './shine/shine-product-view/shine-product-view.component';
import { Image360ViewComponent } from './image-360-view/image-360-view.component';



const routes: Routes = [
  {
    path: 'sheshine', component: SheshineComponent, children:
  [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/sheshine/home', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
     { path: 'products/:category', component: ProductsComponent },

    // { path: 'payment', component: PaymentComponent },
    {path:'view/:id',component:ProductViewDetailsComponent},

    { path: 'contact', component: ContactComponent },
        { path: 'cart', component: CartComponent },





      ]
  },
  {
    path: 'shine', component: ShineComponent, children: [
      { path: 'shinehome', component: ShineHomeComponent },
      { path: '', redirectTo: '/shine/shinehome', pathMatch: 'full' },
       {path: 'bodycare', component: BodyCareComponent},
     { path: 'babycare', component: BabyCareComponent },
     { path: 'facecare', component: FaceCareComponent },
     { path: 'haircare', component: HairCareComponent },
     { path: 'skincare', component: SkinCareComponent },
     {path: 'shineproducts', component: ShineproductsComponent },
     { path: 'newlaunches', component: NewLaunchesComponent },
      { path: 'view/:id', component: ShineProductViewComponent }

   ] },




  { path: '', redirectTo: '/shine', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: ProductCardComponent },
  { path: 'address-list/:id', component: AddressListComponent },
  { path: 'address-list', component: AddressListComponent },
   { path: 'product/:id', component: ProductOrderComponent },
  { path: 'add-address', component: AddAddressComponent },
  { path: 'toggle', component: TogglingComponent },
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order', component: OrderHistoryComponent },
  { path: 'user', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'image360', component: Image360ViewComponent },
  { path: 'about', component: AboutComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

