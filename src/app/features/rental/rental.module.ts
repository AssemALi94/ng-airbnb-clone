import { NgModule } from '@angular/core';

import { NgPipesModule } from 'ngx-pipes';

import { RentalRountingModule } from './rental-rounting.module';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    RentalRountingModule,
    NgPipesModule,
    SharedModule
  ],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent
  ],
  providers: []
})
export class RentalModule { }
