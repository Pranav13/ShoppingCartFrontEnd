import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.baseURL + "/api";

  constructor(private http: HttpClient) { }

  save(product: Product) {
    return this.http.post(this.url + '/products', product);
  }

  update(product: Product) {
    return this.http.put(this.url + "/products", product);
  }

  getAll() {
    return this.http.get<Product[]>(this.url + "/products");
  }

  getProductById(id: string) {
    return this.http.get<Product>(this.url + "/products/" + id);
  }

  delete(id: String) {
    return this.http.delete(this.url + "/products/" + id);
  }
}
