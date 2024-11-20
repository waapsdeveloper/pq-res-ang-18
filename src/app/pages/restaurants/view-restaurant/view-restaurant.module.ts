import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRestaurantRoutingModule } from './view-restaurant-routing.module';
import { ViewRestaurantComponent } from './view-restaurant.component';


@NgModule({
  declarations: [
    ViewRestaurantComponent
  ],
  imports: [
    CommonModule,
    ViewRestaurantRoutingModule
  ]
})
export class ViewRestaurantModule { }
