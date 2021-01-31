import { Component, Input, OnInit } from '@angular/core';
import { ItemsEntity } from 'shared/models/item';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
@Input('cart') cart:ShoppingCart;

getTotalItem(){
  return this.cart.items.length;
}

getItemPrice(item: ItemsEntity){
  return item.quantity * item.price;
}

getTotalCartPrice(){
  let sum = 0;
  for(let item of this.cart.items){
      sum += item.price * item.quantity;
  }
  return sum;
}

}
