import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { OrderComponent } from './ui/order/order.component';
import { OrdersService } from '../../../core/data-access/orders.service';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [AsyncPipe, OrderComponent, MaterialModule, FormsModule, JsonPipe],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss',
})
export class AdminOrdersComponent {
  ordersService = inject(OrdersService);

  orders$: Observable<any> = this.ordersService.getOrders().pipe(
    tap((res: any) =>
      res.forEach((el: any) => {
        if (el.completed) this.completedOrders.push(el);
        else {
          this.unCompletedOrders.push(el);
          this.dates.push(el.deliveryDate);
        }
      })
    )
  );

  filterCompleted$ = new BehaviorSubject(false);

  showCompleted: boolean = false;

  selectedDates: any = [];

  dates: string[] = [];
  unCompletedOrders: any = [];
  completedOrders: any = [];

  onAction(orders: any, index: number) {
    orders = orders.splice(index, 1);
  }

  onSelectDate(date: any) {
    if (this.selectedDates.includes(date)) {
      this.selectedDates = this.selectedDates.filter((el: any) => el != date);
    } else {
      this.selectedDates.push(date);
    }
    console.log(this.selectedDates);
  }
}
