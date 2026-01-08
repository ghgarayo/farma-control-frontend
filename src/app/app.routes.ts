import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  // },
  // {
  //   path: 'forgot-password',
  //   loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  // },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
