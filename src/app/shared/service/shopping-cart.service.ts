import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  url = environment.baseURL + "/api";

  private currentCartSubject: BehaviorSubject<ShoppingCart> = new BehaviorSubject(null);
  public currentCart: Observable<ShoppingCart>;

  constructor(private http: HttpClient, private _dataService: SharedService) {
    this.currentCart = this.currentCartSubject.asObservable();
  }

  public get currentCartValue(): ShoppingCart {
    return this.currentCartSubject.value;
  }

  getProfileObs(): Observable<ShoppingCart> {
    return this.currentCartSubject.asObservable();
  }

  private create() {
    //var dateCreated = {dateCreated:new Date().getTime()};
    //return this.http.post(this.url+'/shopping-carts',dateCreated);
    return this.http.post(this.url + '/shopping-carts', {});
  }

  getCart() {
    let cartId = this.getOrCreateCartId();
    return this.http.get<ShoppingCart>(this.url + '/shopping-carts/' + cartId)
      .pipe(map(shoppingCart => {
        this._dataService.setData(shoppingCart);
        return shoppingCart;
      }));
  }

  async clearCart() {
    let cartid = await this.getOrCreateCartId();
    localStorage.removeItem('cartId');
    return this.http.delete<ShoppingCart>(this.url + '/shopping-carts/' + cartid);
  }

  private getOrCreateCartId(): string {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.create().subscribe((result: any) => {
        localStorage.setItem('cartId', result.id);
      });
      return localStorage.getItem('cartId');
    } else {
      return cartId;
    }
  }

  async addTocart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    this.http.put(this.url + '/shopping-carts/' + cartId + "/" + 1, product).subscribe((response: ShoppingCart) => {
      this._dataService.updateData(response);
    })
  }


  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    this.http.put(this.url + '/shopping-carts/' + cartId + "/" + -1, product).subscribe((response: ShoppingCart) => {
      // console.log(response);
      this._dataService.updateData(response);
    })
  }

}
