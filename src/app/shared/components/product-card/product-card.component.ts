import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

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
    if(!this.shoppingCart || !this.shoppingCart.itemRequests) return 0;
    
    let item = this.shoppingCart.itemRequests.find(x => x.id == this.product.id);
    return item ? item.quantity : 0;
  }

}
