import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { User } from 'shared/models/user';
import { AuthenticationService } from 'shared/service/authentication.service';
import { SharedService } from 'shared/service/shared.service';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  username: string;
   user:User ;
   shoppingCartItemCount;
   private _data: ReplaySubject<ShoppingCart>;

  constructor(public authenticationService: AuthenticationService, 
              private shoppingCartService: ShoppingCartService,
              private sharedService: SharedService,
              private router: Router
    ) { 
    
  }

   ngOnInit() {
       let cart$ = this.shoppingCartService.getCart();
      this._data = this.sharedService.dataObs$;
      this._data.subscribe((data:ShoppingCart) => {
        this.shoppingCartItemCount = 0;
           for(let items of data.itemRequests)
             this.shoppingCartItemCount += items.quantity;  
           
      });
     
  }

  isAdmin(){
    if(this.authenticationService.currentUserValue.roles.includes( "ROLE_ADMIN")){
      return true;
    }
    return false;
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
