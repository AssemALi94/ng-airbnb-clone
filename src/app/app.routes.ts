import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'rentals', loadChildren: 'src/app/features/rental/rental.module#RentalModule'
  },
  {
    path: 'auth', loadChildren: 'src/app/features/auth/auth.module#AuthModule'
  },
  {
    path: '', redirectTo: 'rentals', pathMatch: 'full'
  },
  {
    path: '**', loadChildren: 'src/app/features/rental/rental.module#RentalModule'
  }
];
