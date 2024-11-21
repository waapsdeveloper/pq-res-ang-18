import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantOverviewRoutingModule } from './restaurant-overview-routing.module';
import { RestaurantOverviewComponent } from './restaurant-overview.component';


@NgModule({
  declarations: [
    RestaurantOverviewComponent
  ],
  imports: [
    CommonModule,
    RestaurantOverviewRoutingModule
  ]
})
export class RestaurantOverviewModule { }
