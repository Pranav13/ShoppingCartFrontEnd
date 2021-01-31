import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit ,OnDestroy {
  dtOptions: DataTables.Settings = {};
  products:Product[] = [];
  dtTrigger: Subject<any> = new Subject();
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
      this.productService.getAll().subscribe(products =>{
        this.products = products;
        this.dtTrigger.next();
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
