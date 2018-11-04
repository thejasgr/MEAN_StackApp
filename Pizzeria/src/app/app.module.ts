import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { BuildUrPizzaComponent } from './build-ur-pizza/build-ur-pizza.component';
import { CartComponent } from './cart/cart.component';
import { HttpService } from './http.service';
import { LoginHomeComponent } from './login-home/login-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    PizzaOrderComponent,
    BuildUrPizzaComponent,
    CartComponent,
    LoginHomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,MatSnackBarModule, MatCheckboxModule,MatProgressBarModule, MatCardModule,ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule.forRoot(
      [
        {
          path: '', component: HomeScreenComponent
        },
        {
          path: 'OrderPizza', component: PizzaOrderComponent
        },
        {
          path: 'Customize', component: BuildUrPizzaComponent
        },
        {
          path: 'ShoppingCart', component: CartComponent
        },
        {
          path:'navbar',component:NavbarComponent
        }
      ]
    )
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
