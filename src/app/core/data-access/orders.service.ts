import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  http = inject(HttpClient);

  apiUrl = environment.apiUrl + 'api/';

  getOrders() {
    return this.http.get(`${this.apiUrl}orders/get/all/`);
  }

  completeOrder(orderId: number) {
    return this.http.get(`${this.apiUrl}orders/complete/${orderId}/`);
  }

  deleteOrder(orderId: number) {
    return this.http.delete(`${this.apiUrl}orders/delete/${orderId}/`);
  }
}
