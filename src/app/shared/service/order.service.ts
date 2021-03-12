import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = environment.baseURL + "/api";

  constructor(private http: HttpClient,
              private shoppingCartService:ShoppingCartService) { }

  placeOrder(order) {
    let result = this.http.post(this.url + "/orders", order);
    let cart$ =  this.shoppingCartService.clearCart();
    cart$.subscribe((cart) =>{
        
    })
    return result;
  }

  getAllOrder(){
    return this.http.get(this.url + "/orders");
  }

  getAllOrderWithUser(username){
    return this.http.get(this.url + "/orders/user/"+username);
  }

}
