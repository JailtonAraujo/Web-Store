import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NgxbootstrapModule } from './publics/ngxbootstrap.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { favoriteReducer } from './store/favorityReducer';
import { authReducer } from './store/authReducer';
import { loadingReducer } from './store/loadingReducer';

import { CartComponentComponent } from './components/cart-component/cart-component.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HeaderSimpleComponent } from './components/header-simple/header-simple.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyordersComponent } from './pages/myorders/myorders.component';
import { SuccessOrderComponent } from './pages/success-order/success-order.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderInterceptor } from './guards/header.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FlashMessageComponent,
    FinalizeOrderComponent,
    CartComponentComponent,
    FavoritesComponent,
    HeaderSimpleComponent,
    ProfileComponent,
    MyordersComponent,
    SuccessOrderComponent,
    LoadingComponent
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
      cartReducer:cartReducer,
      favoriteReducer:favoriteReducer,
      authReducer:authReducer,
      loadingReducer:loadingReducer
    })
  ], exports:[
    HomeComponent
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HeaderInterceptor,
      multi:true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
