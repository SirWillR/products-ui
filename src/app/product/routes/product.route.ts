import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../feature-list/feature-list.component').then((m) => m.FeatureListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('../feature-create/feature-create.component').then((m) => m.FeatureCreateComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../feature-create/feature-create.component').then((m) => m.FeatureCreateComponent),
  },
];
