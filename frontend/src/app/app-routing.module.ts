import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FinalizeOrderComponent } from './pages/finalize-order/finalize-order.component';
import { CartComponentComponent } from './components/cart-component/cart-component.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyordersComponent } from './pages/myorders/myorders.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileComponent},
  {path:'myordes', component:MyordersComponent},
  {path:'cart', component:CartComponentComponent},
  {path:'favorites', component:FavoritesComponent},
  {path:'order/finalize',component:FinalizeOrderComponent},
  {path:'product/details/:id',component:ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
