import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'shared/service/authentication.service';
import { OrderService } from 'shared/service/order.service';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as faker from 'faker';

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

  generatePDF(order){
    const doc = new jsPDF();
    const columns = [['Product Name', 'Price', 'Quantity','Total Price','5']];
    var data = [];

    for(var i = 0 ;i<order.orderproduct.length;i++){
       data.push(
        [order.orderproduct[i].imageUrl, order.orderproduct[i].price, order.orderproduct[i].quantity,order.orderproduct[i].totalprice]
       )
    }
   var total = '500';
     autoTable(doc, {
          head: columns,
          body: data,
          didDrawPage: (dataArg) => { 
           doc.text('Your Order Total = ', dataArg.settings.margin.left, 10);
           doc.text(total,65, 10);
          }
     }); 
    
     

    doc.save('table.pdf');
  }

   bodyRows(rowCount) {
    rowCount = rowCount || 10
    var body = []
    for (var j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        expenses: faker.finance.amount(),
      })
    }
    return body
  }

   headRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ]
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
