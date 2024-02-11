import { Component, Input, inject } from '@angular/core';
import { ProductComponent } from '../../feature/product/product.component';

@Component({
  selector: 'cart-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Input() products: any;
}
