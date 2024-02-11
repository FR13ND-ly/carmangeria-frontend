import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/data-access/cart.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { OrderComponent } from './ui/order/order.component';
import { OrdersService } from '../../../core/data-access/orders.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [AsyncPipe, OrderComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss',
})
export class AdminOrdersComponent {
  ordersService = inject(OrdersService);

  orders$: Observable<any> = this.ordersService.getOrders();

  onAction(orders: any, index: number) {
    orders = orders.splice(index, 1);
  }
}
