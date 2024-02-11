import { Component, afterNextRender, inject } from '@angular/core';
import { CartService } from '../../core/data-access/cart.service';
import { DetailsComponent } from './feature/details/details.component';
import { FinishedComponent } from './ui/finished/finished.component';
import { MenuComponent } from './ui/menu/menu.component';
import { ProductsComponent } from './ui/products/products.component';
import { ProductsService } from '../../core/data-access/products.service';
import { switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../core/data-access/loading.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    DetailsComponent,
    ProductsComponent,
    MenuComponent,
    FinishedComponent,
    AsyncPipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  loadingService = inject(LoadingService);
  snackbar = inject(MatSnackBar);

  constructor() {
    afterNextRender(() => {
      this.cart.data = this.cartService.getPreferences();
    });
  }

  cart$ = this.cartService.cart$;
  step = 0;

  products$ = this.cart$.pipe(
    tap((cart) => (this.cart.products = cart)),
    switchMap((cart: any) => this.productsService.getProductsById(cart))
  );

  cart: any = {
    products: [],
  };

  onFinish(): any {
    if (!this.cart.data.name) {
      this.snackbar.open('Numele e obligatoriu', '', { duration: 3000 });
      return;
    }
    if (!this.cart.data.phone) {
      this.snackbar.open('Telefonul e obligatoriu', '', { duration: 3000 });
      return;
    }
    if (!this.cart.data.deliveryDate) {
      this.snackbar.open('Data de livrare e obligatorie', '', {
        duration: 3000,
      });
      return;
    }
    this.loadingService.setLoading(true);
    this.cartService.finishCommand(this.cart).subscribe(() => {
      this.step = 2;
      this.loadingService.setLoading(false);
    });
  }
}
