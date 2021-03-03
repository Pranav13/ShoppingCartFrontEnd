import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'shared/shared.module';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from 'app/shopping/components/products/products.component';



@NgModule({
  declarations: [ 
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent],
  imports: [
   SharedModule,
   BrowserAnimationsModule,
   ToastrModule.forRoot(),
    RouterModule.forChild([
      { path: '',component: ProductsComponent},
     
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
     
    ])
  ],
  exports:[
    BsNavbarComponent
  ]
})
export class CoreModule { }
