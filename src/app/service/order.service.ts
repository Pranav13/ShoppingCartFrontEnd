import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //url = 'http://localhost:3000';
  //url = 'https://my-json-server.typicode.com/pranav13/json-server';
  url = 'http://localhost:9090/api';

  constructor(private http: HttpClient,
    private shoppingCartService: ShoppingCartService
    ) { }

  async placeOrder(order){
    console.log(JSON.stringify(order));
    let result =  await this.http.post(this.url+"/orders",order).toPromise();
    (await this.shoppingCartService.clearCart()).toPromise();
    return result;
  }
}
