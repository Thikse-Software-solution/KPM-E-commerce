import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheshineComponent } from './sheshine/sheshine.component';
import { ShineComponent } from './shine/shine.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products-component/products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'sheshine', component: SheshineComponent, children: [
    {path: 'home',component:HomeComponent},
    { path: '', redirectTo: '/sheshine/home', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },

  ] },
  { path: '', redirectTo: '/sheshine', pathMatch: 'full' },
  { path: 'shine', component: ShineComponent }
  // Redirect to Sheshine by default

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

