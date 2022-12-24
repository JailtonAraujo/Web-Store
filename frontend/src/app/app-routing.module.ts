import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FinalizeOrderComponent } from './pages/finalize-order/finalize-order.component';
import { CartComponentComponent } from './components/cart-component/cart-component.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'product/details/:id',component:ProductDetailsComponent},
  {path:'order/finalize/:id',component:FinalizeOrderComponent},
  {path:'cart', component:CartComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
