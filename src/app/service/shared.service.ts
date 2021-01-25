import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //public data = new BehaviorSubject<ShoppingCart>(null);
  public dataObs$ = new ReplaySubject<ShoppingCart>(1);

  public setData(data: ShoppingCart) {
    //this.data.next(data);
    return this.dataObs$.asObservable();
  }

  getData() {
    return this.dataObs$.asObservable();
}

updateData(data) {
    this.dataObs$.next(data);
}
}
