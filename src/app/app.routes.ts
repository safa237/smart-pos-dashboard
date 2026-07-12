import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/pages/orders-page/orders-page.component')
            .then(m => m.OrdersPageComponent)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/pages/products-page/products-page.component')
            .then(m => m.ProductsPageComponent)
      },
      {
        path: 'kitchen',
        loadComponent: () =>
          import('./features/kitchen/pages/kitchen-page/kitchen-page.component')
            .then(m => m.KitchenPageComponent)
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'orders'
  }
];