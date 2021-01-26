import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //url = 'http://localhost:9090/api/auth';
  url = environment.baseURL+"/api/auth"; 
   
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>(`/users`);
  }

  register(user: User) {
      //return this.http.post(`/users/register`, user);
      return this.http.post(this.url+'/signup',user);
  }

  delete(id: number) {
      return this.http.delete(`/users/${id}`);
  }
}
