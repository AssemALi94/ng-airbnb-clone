import { Routes } from '@angular/router';

import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalComponent } from './rental.component';
import { AuthGuard } from '../../core/auth/auth.guard';

export const RentalRoutes: Routes = [
  {
    path: '', component: RentalComponent
  },
  {
    path: ':id', component: RentalDetailComponent, canActivate: [AuthGuard]
  }
];
