import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cart-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() set products(products: any) {
    this.price = 0;
    this.productsCount = 0;
    products.forEach((product: any) => {
      this.price += product.price * product.amount;
      this.productsCount += product.amount;
    });
  }
  @Input() step: number = 0;
  @Output() stepChange = new EventEmitter();
  @Output() finish = new EventEmitter();

  price: number = 0;
  productsCount: number = 0;

  onNext() {
    if (this.step + 1 == 2) this.finish.emit();
    this.stepChange.emit(1);
  }

  onBack() {
    this.stepChange.emit(0);
  }
}
