import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminStatisticsComponent } from './admin-statistics/admin-statistics.component';
import { authGuard } from '../../core/guards/auth.guard';
import { loginGuard } from '../../core/guards/login.guard';
import { DashboardComponent } from './ui/dashboard/dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: '',
            component: DashboardComponent,
            title: "Meniu Principal | Carmangeria lui Geo'",
          },
          {
            path: 'products',
            component: AdminProductsComponent,
            title: "Produse | Carmangeria lui Geo'",
          },
          {
            path: 'orders',
            component: AdminOrdersComponent,
            title: "Comenzi | Carmangeria lui Geo'",
          },
          {
            path: 'statistics',
            component: AdminStatisticsComponent,
            title: "Statistică | Carmangeria lui Geo'",
          },
        ],
        canActivate: [authGuard],
      },
      {
        path: 'login',
        component: AdminLoginComponent,
        canActivate: [loginGuard],
        title: "Logare | Carmangeria lui Geo'",
      },
    ]),
  ],
})
export class AdminModule {}
