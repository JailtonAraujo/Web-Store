import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NgxbootstrapModule } from './publics/ngxbootstrap.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { PublicComponentsModule } from './publics/public-components.module';
import { ProductModule } from './components/product/product.module';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
import { FinalizeOrderComponent } from './pages/finalize-order/finalize-order.component';

//redux
import { orderReducer } from './store/orderReducer';
import { cartReducer } from './store/cartReducer';
import { CartComponentComponent } from './components/cart-component/cart-component.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FlashMessageComponent,
    FinalizeOrderComponent,
    CartComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxbootstrapModule,
    FontAwesomeModule,
    ProductModule,
    PublicComponentsModule,
    HttpClientModule,
    StoreModule.forRoot({
      orderReducer:orderReducer,
      cartReducer:cartReducer
    })
  ], exports:[
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
