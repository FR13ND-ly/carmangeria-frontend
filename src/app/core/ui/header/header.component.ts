import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MaterialModule } from '../../feature/material/material.module';
import { RouterLink } from '@angular/router';
import { CartService } from '../../data-access/cart.service';
import { AsyncPipe } from '@angular/common';
import { filter, map, startWith, tap } from 'rxjs';
import { LoadingService } from '../../data-access/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  cartService = inject(CartService);
  loadingService = inject(LoadingService);
  changes = inject(ChangeDetectorRef);

  loading$ = this.loadingService.loading$;
  cartLength = signal(0);

  ngAfterViewInit(): void {
    this.cartService.cart$
      .pipe(map((cart: any) => cart.length))
      .subscribe((res) => {
        this.cartLength.set(res);
        this.changes.detectChanges();
      });
  }
}
