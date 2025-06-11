import { Routes } from '@angular/router';

export const houseRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/detail/detail.component').then((m) => m.DetailComponent),
  },
];
