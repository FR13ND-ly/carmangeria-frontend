import { DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { AmountComponent } from '../../../../core/ui/amount/amount.component';
import { CartService } from '../../../../core/data-access/cart.service';

@Component({
  selector: 'app-product-details-dialog',
  standalone: true,
  imports: [MaterialModule, AmountComponent],
  templateUrl: './product-details-dialog.component.html',
  styleUrl: './product-details-dialog.component.scss',
})
export class ProductDetailsDialogComponent {
  cartService = inject(CartService);
  product = inject(DIALOG_DATA);
  dialog = inject(Dialog);

  amount = 1;

  onAddToCart() {
    let data = {
      productId: this.product.id,
      amount: this.amount,
    };
    this.cartService.addProduct(data);
    this.dialog.closeAll();
  }
}
