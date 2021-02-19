import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = environment.baseURL + "/api";

  constructor(private http: HttpClient
  ) { }

  placeOrder(order) {
    let result = this.http.post(this.url + "/orders", order)
    //(await this.shoppingCartService.clearCart()).toPromise();
    return result;
  }
}
