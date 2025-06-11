import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'houses',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/houses/house.routes').then((m) => m.houseRoutes),
  },
  {
    path: 'characters',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/characters/character.routes').then(
        (m) => m.characterRoutes
      ),
  },
  {
    path: 'books',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/books/book.routes').then((m) => m.bookRoutes),
  },
  {
    path: 'favorites',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/favorites/favorite.routes').then(
        (m) => m.favoriteRoutes
      ),
  },
  { path: '**', redirectTo: 'home' },
];
