import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductService } from 'shared/service/product.service';
import { SharedService } from 'shared/service/shared.service';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[] = [];
  filteredProduct: Product[] = [];
  category;
  cart:any;
  private _data: ReplaySubject<ShoppingCart>;
  constructor(
    private route: ActivatedRoute,
    private productService:ProductService,
    private shoppingCartService:ShoppingCartService,
    private sharedService: SharedService
    ) {

      
      productService.getAll().pipe(switchMap(products => {
        this.products = products
        return route.queryParamMap;
      }))
      .subscribe(parmas =>{
          this.category = parmas.get('category');
          
          this.filteredProduct = (this.category) ?
            this.products.filter(p => p.category == this.category) :
            this.products; 
        });
      
     


     }
   ngOnInit() {
    this._data = this.sharedService.dataObs$;
      this._data.subscribe((cart:ShoppingCart) => {
        this.cart = cart;    
      });
  }
}
