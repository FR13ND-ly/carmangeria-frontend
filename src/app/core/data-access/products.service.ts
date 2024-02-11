import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'api/';

  getAll() {
    return this.http
      .get(this.apiUrl + 'products/get/all/')
      .pipe(map((res: any) => this.groupBy(res, (el: any) => el.type)));
  }

  groupBy(arr: any, keyGetter: any) {
    const map = new Map();
    arr.forEach((el: any) => {
      const key = keyGetter(el);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [el]);
      } else {
        collection.push(el);
      }
    });
    return Array.from(map, ([name, products]) => ({ name, products }));
  }

  getProductsById(data: any) {
    return this.http.post(`${this.apiUrl}products/get/ids/`, data);
  }

  addProduct(product: any) {
    return this.http.post(`${this.apiUrl}products/add/`, product);
  }

  updateProduct(product: any) {
    return this.http.post(`${this.apiUrl}products/update/`, product);
  }

  deleteProduct(productId: any) {
    return this.http.delete(`${this.apiUrl}products/delete/${productId}/`);
  }
}
