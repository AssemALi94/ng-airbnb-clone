import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RentalRoutes } from './rental.routes';

@NgModule({
  imports: [
    RouterModule.forChild(RentalRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RentalRountingModule { }
