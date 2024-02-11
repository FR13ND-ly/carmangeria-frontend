import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../feature/material/material.module';
import { RouterLink } from '@angular/router';
import { CartService } from '../../data-access/cart.service';
import { AsyncPipe } from '@angular/common';
import { filter, map, tap } from 'rxjs';
import { LoadingService } from '../../data-access/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartService = inject(CartService);
  loadingService = inject(LoadingService);

  loading$ = this.loadingService.loading$;
  cartLength$ = this.cartService.cart$.pipe(map((cart: any) => cart.length));
}
