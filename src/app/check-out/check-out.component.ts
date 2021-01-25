import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthenticationService } from '../service/authentication.service';
import { OrderService } from '../service/order.service';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
cart$:Observable<ShoppingCart>;

  constructor(
    private shoppingCartService: ShoppingCartService
    ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    //cart$.subscribe(cart => this.cart = cart);
  }

  
  
 

}
