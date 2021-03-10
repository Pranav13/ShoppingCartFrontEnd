import { Component, OnInit } from '@angular/core';
import { ItemsEntity } from 'shared/models/item';
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

   ngOnInit() {
      let cart$ =  this.shoppingCartService.getCart();
      this.shoppingCartItemCount = 0;
      this.sum = 0;
    cart$.toPromise().then((cart:ShoppingCart) =>{
      this.cartItem = cart.itemRequests;
      for(let items of cart.itemRequests){
        this.shoppingCartItemCount += items.quantity;
        this.sum += items.price * items.quantity ;  
    }});
  }

  getTotal(item : ItemsEntity){
    return item.price * item.quantity;
  }

   clearCart(){
    this.cartItem = [];
    this.shoppingCartItemCount = 0;
    let cart$ =  this.shoppingCartService.clearCart();
    cart$.subscribe((cart) =>{
        
    })
  }
}
