import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, inject } from '@angular/core';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from '../../../../core/data-access/cart.service';
import { AmountComponent } from '../../../../core/ui/amount/amount.component';

@Component({
  selector: 'product',
  standalone: true,
  imports: [MaterialModule, AmountComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  cartService = inject(CartService);
  @Input() product: any;

  dialog = inject(Dialog);
  amount = 1;

  onOpenDetails(product: any) {
    this.dialog.open(ProductDetailsDialogComponent, {
      data: product,
      backdropClass: 'backdrop',
      autoFocus: false,
    });
  }

  onAddToCart(product: any) {
    let data = {
      productId: product.id,
      amount: this.amount,
    };
    this.cartService.addProduct(data);
  }
}
