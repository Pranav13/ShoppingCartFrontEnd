import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Category } from 'shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.baseURL+"/api";
  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url+'/category');
}

}
