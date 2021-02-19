import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public dataObs$ = new ReplaySubject<ShoppingCart>(1);

  public setData(data: ShoppingCart) {
    return this.dataObs$.asObservable();
  }

  getData() {
    return this.dataObs$.asObservable();
  }

  updateData(data) {
    this.dataObs$.next(data);
  }
}
