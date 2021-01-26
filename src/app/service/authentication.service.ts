import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  //private _refreshNeeded$ = new Subject<void>();
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  // get refreshNeeded$(){
  //     return this._refreshNeeded$;
  // }
  //url = 'http://localhost:9090/api/auth';
  url = environment.baseURL+"/api/auth";

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(username, password) {
      return this.http.post<any>(this.url+'/signin', { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log("inside login success");
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              
              //this.fireIsLoggedIn.emit(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  // getEmitter() { 
  //   return this.fireIsLoggedIn; 
  // } 
}
