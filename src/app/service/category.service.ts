import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //url = 'http://localhost:3000';
  //url = 'https://my-json-server.typicode.com/pranav13/json-server';
  url = 'http://localhost:9090/api';
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url+'/category');
}

}
