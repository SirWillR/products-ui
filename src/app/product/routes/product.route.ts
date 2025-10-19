import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../feature-list/feature-list.component').then((m) => m.FeatureListComponent),
  },
];
