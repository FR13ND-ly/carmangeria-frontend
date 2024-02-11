import { Injectable, OnInit, afterNextRender, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { isStringObject } from 'util/types';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from './orders.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  snackbar = inject(MatSnackBar);
  router = inject(Router);
  http = inject(HttpClient);
  ordersService = inject(OrdersService);

  apiUrl = environment.apiUrl + 'api/';

  constructor() {
    afterNextRender(() => {
      let cart = JSON.parse(localStorage.getItem('cart')!);
      if (cart) this.cartSubject$.next(cart);
      else this.cartSubject$.next([]);
    });
  }

  cartSubject$ = new BehaviorSubject<any>(-1);

  cart$ = this.cartSubject$.pipe(
    filter((cart) => cart != -1),
    tap((cart) => {
      localStorage.setItem('cart', JSON.stringify(cart));
    })
  );

  addProduct(product: any) {
    if (
      this.cartSubject$.value
        .map((el: any) => el.productId)
        .includes(product.productId)
    ) {
      this.cartSubject$.next(
        this.cartSubject$.value.map((el: any) => {
          if (el.productId == product.productId) {
            el.amount += product.amount;
          }
          return el;
        })
      );
    } else {
      let cart: any[] = [...this.cartSubject$.value, product];
      this.cartSubject$.next(cart);
    }
    let snackbar = this.snackbar.open('Produsul a fost adăugat în coș', 'Coș', {
      duration: 5000,
    });
    snackbar.onAction().subscribe(() => this.router.navigate(['/cart']));
  }

  updateProduct(product: any) {
    this.cartSubject$.next(
      this.cartSubject$.value.map((el: any) => {
        if (el.productId == product.id) {
          el.amount = product.amount;
        }
        return el;
      })
    );
  }

  removeProduct(product: any) {
    this.cartSubject$.next(
      this.cartSubject$.value.filter(
        (item: any) => product.id != item.productId
      )
    );
  }

  finishCommand(cart: any) {
    if (cart.data.savePreferences) this.savePreferences(cart.data);
    return this.http
      .post(`${this.apiUrl}orders/add/`, cart)
      .pipe(tap(() => this.cartSubject$.next([])));
  }

  getPreferences() {
    let raw = JSON.parse(localStorage.getItem('preferences')!);
    if (raw !== null) {
      raw.savePreferences = false;
      raw.deliveryDate = '';
      return raw;
    } else {
      return {
        name: '',
        phone: '',
        email: '',
        message: '',
        deliveryDate: '',
        savePreferences: '',
      };
    }
  }

  savePreferences(data: any) {
    let preferences = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
    };
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }
}
