import { Component, Input, inject } from '@angular/core';
import { AmountComponent } from '../../../../core/ui/amount/amount.component';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { CartService } from '../../../../core/data-access/cart.service';

@Component({
  selector: 'cart-product',
  standalone: true,
  imports: [AmountComponent, MaterialModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product: any;
  @Input() amount: number = 1;

  cartService = inject(CartService);

  onDeleteProduct() {
    this.cartService.removeProduct(this.product);
  }

  onChangeAmount(product: any) {
    this.cartService.updateProduct(product);
  }
}
