import { Routes } from '@angular/router';
import { productRoutes } from '../product/routes/product.route';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    children: [...productRoutes],
  },
];
