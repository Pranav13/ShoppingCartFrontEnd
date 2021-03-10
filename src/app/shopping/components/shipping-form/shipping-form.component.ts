import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'shared/models/order';
import { AuthenticationService } from 'shared/service/authentication.service';
import { OrderService } from 'shared/service/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  shipping = {name:'',addressLine1:'',addressLine2:'',city:''}; 
  userId;
  @Input('cart') cart;
  constructor( 
    private router: Router,
    private authService: AuthenticationService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.userId = this.authService.currentUserValue.username;
  }

   placeOrder() {
    let order = new Order(this.userId,this.shipping,this.cart);
     this.orderService.placeOrder(order).subscribe((result:any) => {
      this.router.navigate(['/order-success',result.id]);
    });
    
  } 

}
