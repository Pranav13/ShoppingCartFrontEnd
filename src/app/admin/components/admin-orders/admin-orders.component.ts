import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from 'shared/service/order.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,OnDestroy {
  orders:any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.orderService.getAllOrder().subscribe((order:any) =>{
      this.orders = order;
      this.dtTrigger.next();
    })

   // this.orders$ = this.orderService.getAllOrder(); 
    //this.dtTrigger.next();
    //console.log(this.orders$);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
