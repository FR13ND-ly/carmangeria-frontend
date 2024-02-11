import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CartService } from '../../../../../core/data-access/cart.service';
import { OrdersService } from '../../../../../core/data-access/orders.service';

@Component({
  selector: 'order',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  orderService = inject(OrdersService);
  @Output() action = new EventEmitter();

  @Input() order: any;

  price: number = 0;

  ngOnInit(): void {
    this.order.products.forEach((product: any) => {
      this.price += product.price * product.amount;
    });
  }

  onComplete(productId: number) {
    if (!confirm('Ești sigur?')) return;
    this.orderService
      .completeOrder(productId)
      .subscribe(() => this.action.emit());
  }

  onDelete(productId: number) {
    if (!confirm('Ești sigur?')) return;
    this.orderService
      .deleteOrder(productId)
      .subscribe(() => this.action.emit());
  }
}
