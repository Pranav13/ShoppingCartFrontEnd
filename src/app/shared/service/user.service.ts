import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { User } from 'shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseURL + "/api/auth";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  register(user: User) {
    return this.http.post(this.url + '/signup', user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
