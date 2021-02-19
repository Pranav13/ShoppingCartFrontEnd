import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/helper/auth.guard';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminGuard } from './service/admin.guard';


@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard,AdminGuard]},
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard,AdminGuard]},
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard,AdminGuard]},
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard,AdminGuard]}
    ])
  ],
  providers: [
    AdminGuard
  ]
})
export class AdminModule { }
