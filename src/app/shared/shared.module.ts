import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'app/app-routing.module';
import { CustomFormsModule } from 'ng2-validation';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { AuthGuard } from './helper/auth.guard';
import { AuthenticationService } from './service/authentication.service';
import { CategoryService } from './service/category.service';
import { OrderService } from './service/order.service';
import { ProductService } from './service/product.service';
import { SharedService } from './service/shared.service';
import { ShoppingCartService } from './service/shopping-cart.service';
import { UserService } from './service/user.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    CustomFormsModule,
    DataTablesModule
  ],
  declarations: [
    ProductCardComponent
  ],
  exports:[
    ProductCardComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    CustomFormsModule,
    DataTablesModule
  ],
  providers:[
    AuthenticationService,
    CategoryService,
    OrderService,
    ProductService,
    ShoppingCartService,
    SharedService,
    UserService,
    AuthGuard
  ]
})
export class SharedModule { }
