import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { AuthenticationService } from '../service/authentication.service';
import { OrderService } from '../service/order.service';

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

  async placeOrder() {
    let order = new Order(this.userId,this.shipping,this.cart);
    let result:any = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.id]);
  } 

}
