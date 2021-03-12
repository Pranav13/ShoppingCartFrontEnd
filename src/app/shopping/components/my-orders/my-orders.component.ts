import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'shared/service/authentication.service';
import { OrderService } from 'shared/service/order.service';
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';
//declare var jsPDF: any;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {

  orders:any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private orderService:OrderService,
    public authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.orderService.getAllOrderWithUser(this.authenticationService.currentUserValue.username).subscribe((order:any) =>{
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
