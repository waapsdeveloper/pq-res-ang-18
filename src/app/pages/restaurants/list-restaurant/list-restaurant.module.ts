import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRestaurantRoutingModule } from './list-restaurant-routing.module';
import { ListRestaurantComponent } from './list-restaurant.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListRestaurantComponent
  ],
  imports: [
    CommonModule,
    ListRestaurantRoutingModule,
    FormsModule
  ]
})
export class ListRestaurantModule { }
