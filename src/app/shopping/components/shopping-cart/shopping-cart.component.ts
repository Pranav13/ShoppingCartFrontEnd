import { Component, Input, OnInit } from '@angular/core';
import { ItemsEntity } from 'shared/models/item';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart$;
cartItem: ItemsEntity[] = [];
shoppingCartItemCount;
sum;
  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
      let cart$ = await this.shoppingCartService.getCart();
      this.shoppingCartItemCount = 0;
      this.sum = 0;
    cart$.toPromise().then((cart:ShoppingCart) =>{
      this.cartItem = cart.items;
      console.log(this.cartItem);
      for(let items of cart.items){
        this.shoppingCartItemCount += items.quantity;
        this.sum += items.price * items.quantity ;  
    }});
      // cart$.subscribe((cart:ShoppingCart) =>{
      //   this.cartItem = cart.items;
      //   console.log(this.cartItem);
      //   for(let items of cart.items){
      //     this.shoppingCartItemCount += items.quantity;
      //     this.sum += items.price * items.quantity ;  
      // }
      // })
  }

  getTotal(item : ItemsEntity){
    return item.price * item.quantity;
  }

  async clearCart(){
    this.cartItem = [];
    this.shoppingCartItemCount = 0;
    let cart$ = await this.shoppingCartService.clearCart();
    cart$.subscribe((cart) =>{
        
    })
  }
}
