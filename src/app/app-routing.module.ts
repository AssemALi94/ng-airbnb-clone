import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppRoutes } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(
      AppRoutes,
      {
        enableTracing: false,
        useHash: false
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
