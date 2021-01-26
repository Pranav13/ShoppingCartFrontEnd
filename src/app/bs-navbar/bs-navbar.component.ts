import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { User } from '../models/user';
import { AuthenticationService } from '../service/authentication.service';
import { SharedService } from '../service/shared.service';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  username: string;
  //isAdmin:boolean;
   user:User ;
   shoppingCartItemCount;
   private _data: ReplaySubject<ShoppingCart>;

  constructor(public authenticationService: AuthenticationService, 
              private shoppingCartService: ShoppingCartService,
              private sharedService: SharedService
    ) { 
    
  }

   ngOnInit() {
      // this.authenticationService.getEmitter().subscribe((user) => { 
      //     this.username = user.username;
      // }); 
       let cart$ = this.shoppingCartService.getCart();
      // this.shoppingCartItemCount = 0;
      // cart$.subscribe((cart:ShoppingCart) =>{
      //   for(let items of cart.items)
      //     this.shoppingCartItemCount += items.quantity;  
      //   //this.shoppingCartItemCount += cart.items[productId].quantity; 
      // })
     
      this._data = this.sharedService.dataObs$;
      this._data.subscribe((data:ShoppingCart) => {
        this.shoppingCartItemCount = 0;
           for(let items of data.items)
             this.shoppingCartItemCount += items.quantity;  
            //this.shoppingCartItemCount += cart.items[productId].quantity; 
      });
      // this.sharedService.data().subscribe((cart:ShoppingCart) =>{
      //   this.shoppingCartItemCount = 0;
      //     for(let items of cart.items)
      //        this.shoppingCartItemCount += items.quantity;  
      //      //this.shoppingCartItemCount += cart.items[productId].quantity; 
      //   })
  
  
  }

  isAdmin(){
    if(this.authenticationService.currentUserValue.roles.indexOf( "ROLE_Admin")){
      return true;
    }
    return false;
  }

  logout(){
    //console.log(this.authenticationService.currentUserValue.role);
    this.authenticationService.logout();
  }

}
