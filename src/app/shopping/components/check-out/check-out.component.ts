import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthenticationService } from 'shared/service/authentication.service';
import { OrderService } from 'shared/service/order.service';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

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
  }

  
  
 

}
