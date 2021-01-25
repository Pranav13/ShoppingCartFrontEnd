import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../service/product.service';
import { SharedService } from '../service/shared.service';
import { ShoppingCartService } from '../service/shopping-cart.service';

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
    // (await this.shoppingCartService.getCart())
    // .subscribe(cart =>
    //   { this.cart = cart;
    //     //console.log(this.cart);
    //   });
    this._data = this.sharedService.dataObs$;
      this._data.subscribe((cart:ShoppingCart) => {
        this.cart = cart;    
      });
  }

  // ngOnInit(): void {
  //   this.productService.getAll().subscribe(products =>{
  //     this.products = products;
  //   });

  //   this.categoryService.getAll().subscribe(category =>{
  //       this.category = category;
  //       console.log(this.category);
  //   });
  // }
}
