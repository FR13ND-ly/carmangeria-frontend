import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Carmangeria lui Geo' },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Coș | Carmangeria lui Geo',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
    title: 'Administrare | Carmangeria lui Geo',
  },
  { path: '**', redirectTo: '' },
];
