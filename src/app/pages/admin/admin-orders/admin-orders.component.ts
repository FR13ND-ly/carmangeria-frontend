import { Component, OnInit, inject } from '@angular/core';
import { OrderComponent } from './ui/order/order.component';
import { OrdersService } from '../../../core/data-access/orders.service';
import { MaterialModule } from '../../../core/feature/material/material.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SortPipe } from '../../../core/pipes/sort.pipe';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    OrderComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SortPipe,
    JsonPipe,
    NgIf,
  ],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss',
})
export class AdminOrdersComponent implements OnInit {
  ordersService = inject(OrdersService);

  interval = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  showCompleted: boolean = false;

  unCompletedOrders: any = [];
  completedOrders: any = [];

  productsStats: any = [];

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((res: any) => {
      res.forEach((el: any) => {
        if (el.completed) this.completedOrders.push(el);
        else {
          this.unCompletedOrders.push(el);
        }
      });
      this.setStats(this.getStats());
    });
    this.interval.valueChanges.subscribe((res) => {
      if (!(res.start && res.end)) {
        this.setStats(this.getStats());
        return;
      }
      let stats = this.getStats();
      let productsStats: any = {};
      res.end.setDate(res.end.getDate() + 1);
      Object.entries(stats).map(([key, value]: any) => {
        productsStats[key] = [];
        value.forEach((el: any) => {
          let date = new Date(el.date);
          if (res.start <= date && date <= res.end) {
            productsStats[key].push(el);
          }
        });
      });
      this.setStats(productsStats);
    });
  }

  setStats(stats: any) {
    this.productsStats = Object.values(stats).map((el: any) => el[0]);
    this.productsStats = this.productsStats.filter((el: any) => el);
  }

  getStats() {
    let productsStats: any = {};
    this.unCompletedOrders.forEach((el: any) => {
      el.products.forEach((item: any) => {
        productsStats[item.title] = [];
        productsStats[item.title].push({
          id: item.id,
          title: item.title,
          amount: item.amount,
          date: el.deliveryDate,
        });
      });
    });
    return productsStats;
  }

  onAction(orders: any, index: number) {
    orders = orders.splice(index, 1);
  }

  clear() {
    this.interval.setValue({
      start: null,
      end: null,
    });
  }
}
