import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'shared/models/product';
import { AlertService } from 'shared/service/alert.service';
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
  constructor(private productService:ProductService,
    private alertService:AlertService
    ) { }

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


  delete(id){
    this.productService.delete(id)
                      .subscribe(
                        data => {
                           this.alertService.showSuccess('Product Deleted');
                           this.productService.getAll().subscribe(products =>{
                            this.products = products;
                          })
                        },
                        error => {
                           // this.alertService.showError(error);
                        });
  }
}
