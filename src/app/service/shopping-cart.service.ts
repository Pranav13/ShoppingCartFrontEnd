import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  //url = 'http://localhost:3000';
  //url = 'https://my-json-server.typicode.com/pranav13/json-server';
  url = 'http://localhost:9090/api';
  private currentCartSubject: BehaviorSubject<ShoppingCart> = new BehaviorSubject(null);
  public currentCart: Observable<ShoppingCart>;

  constructor(private http: HttpClient,private _dataService: SharedService) { 
   // this.currentCartSubject = new BehaviorSubject<ShoppingCart>(JSON.parse(localStorage.getItem('cartId')));
    this.currentCart = this.currentCartSubject.asObservable();
  }

  public get currentCartValue(): ShoppingCart {
    return this.currentCartSubject.value;
}

getProfileObs(): Observable<ShoppingCart> {
  return this.currentCartSubject.asObservable();
}

   private create(){
    //var dateCreated = {dateCreated:new Date().getTime()};
    //return this.http.post(this.url+'/shopping-carts',dateCreated);
    return this.http.post(this.url+'/shopping-carts',{});
  } 

     getCart(){
      let cartId =  this.getOrCreateCartId();
      return this.http.get<ShoppingCart>(this.url+'/shopping-carts/'+cartId)
          .pipe(map(shoppingCart => {
              this._dataService.setData(shoppingCart);
              return shoppingCart;
          }));
   // return this.http.get<ShoppingCart>(this.url+'/shopping-carts/'+cartId);
  }

  async clearCart()/*:Promise<Observable<ShoppingCart>>*/{
    let cartid = await this.getOrCreateCartId();
    localStorage.removeItem('cartId');
    return this.http.delete<ShoppingCart>(this.url+'/shopping-carts/'+cartid);
  }
  
  private  getOrCreateCartId():string{
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
        this.create().subscribe((result:any) => {
            localStorage.setItem('cartId', result.id);
        });
        return localStorage.getItem('cartId');
    } else {
          return cartId;
    }

     //let cartId = localStorage.getItem('cartId');

    //if(typeof cartId !== undefined || cartId !== null) return cartId;
    // if( cartId !== undefined || cartId !== null){
    //   console.log("Inside");
    //   return cartId;
    // }
    // if(cartId){ 
    //   return cartId;
    // }

    // let result:any = await this.create();
    // localStorage.setItem('cartId',result.id);
    // return result.id;
      // this.create().toPromise().then((result:any) =>{
      //   //console.log(result);  
      //   localStorage.setItem('cartId',result.id);
      //   return this.getCart(result.id);
      // }) 
  }

  async addTocart(product: Product){
    let cartId = await this.getOrCreateCartId();
    //  this.http.get(this.url+'/shopping-carts/'+cartId).subscribe((cart:ShoppingCart) =>{
    //    if(!cart.items){
    //     let newItem = {id:product.id,title:product.title,price:product.price,category:product.category,
    //       imageurl:product.imageurl,quantity:1
    //     }
    //     let item : ItemsEntity[] =[];
    //     item.push(newItem);
    //     this.http.put(this.url+'/shopping-carts/'+cartId,new ShoppingCart(item)).subscribe(response =>{
    //       console.log(response);
    //     })
    //    }
    //   const item = cart.items.find(x => x.id == product.id);
    //   if(item){
    //     cart.items.map(function (item){
    //       if(item.id == product.id){
    //         item.quantity = item.quantity+1; 
    //       }
    //     })
    //     this.http.put(this.url+'/shopping-carts/'+cartId,cart).subscribe(response =>{
    //       console.log(response);
    //     })
    //   }else{
    //     let newItem = {id:product.id,title:product.title,price:product.price,category:product.category,
    //       imageurl:product.imageurl,quantity:1
    //     }
    //     cart.items.push(newItem);
    //     this.http.put(this.url+'/shopping-carts/'+cartId,cart).subscribe(response =>{
    //       console.log(response);
    //     })
    //   }
        
    //     // if(item){
    //     //   item.quantity =1;
    //     //   this.http.put(this.url+'/shopping-carts/'+cartId+'/items/'+item.id,item).subscribe(response =>{
    //     //     console.log(response);
    //     //   })
    //     // }else{

    //     // }
    //  });
    this.http.put(this.url+'/shopping-carts/'+cartId +"/"+1,product).subscribe((response:ShoppingCart) =>{
      this._dataService.updateData(response);
     })
    }


    async removeFromCart(product: Product){
      let cartId = await this.getOrCreateCartId();
    //  this.http.get(this.url+'/shopping-carts/'+cartId).subscribe((cart:ShoppingCart) =>{
    //   const item = cart.items.find(x => x.id === product.id);
    //   if(item){
    //     cart.items.map(function (item){
    //       if(item.id == product.id){
    //         item.quantity = item.quantity - 1;
    //       }
    //     })
    //     this.http.put(this.url+'/shopping-carts/'+cartId,cart).subscribe(response =>{
    //      // console.log(response);
    //     })
    //   }
    //  });
    this.http.put(this.url+'/shopping-carts/'+cartId +"/"+-1,product).subscribe((response:ShoppingCart) =>{
            // console.log(response);
            this._dataService.updateData(response);
           })
    }

}
