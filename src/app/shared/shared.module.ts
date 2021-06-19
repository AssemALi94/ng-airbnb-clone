import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UppercasePipe } from './pipes/uppercase.pipe';
import { MapModule } from './map/map.module';

@NgModule({
  imports: [
    CommonModule,
    MapModule
  ],
  declarations: [
    UppercasePipe
  ],
  exports: [
    CommonModule, // Export it for use on my Features Module
    UppercasePipe,
    MapModule
  ]
})
export class SharedModule { }
