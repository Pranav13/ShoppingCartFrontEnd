import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input("product") product:Product;
@Input("shopping-cart") shoppingCart:ShoppingCart;
  
constructor(private cartService: ShoppingCartService) { }

  addTocart(){
    this.cartService.addTocart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }

  getQuantity(){
    if(!this.shoppingCart || !this.shoppingCart.items) return 0;
    
    let item = this.shoppingCart.items.find(x => x.id == this.product.id);
    return item ? item.quantity : 0;
    
    //let item = this.shoppingCart.items[this.product.id];
    //return item ? item.quantity : 0;
  }

}
