import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheshineComponent } from './sheshine/sheshine.component';
import { ShineComponent } from './shine/shine.component';

const routes: Routes = [
  { path: 'sheshine', component: SheshineComponent },
  { path: 'shine', component: ShineComponent },
  { path: '', redirectTo: '/sheshine', pathMatch: 'full' }, // Redirect to Sheshine by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

