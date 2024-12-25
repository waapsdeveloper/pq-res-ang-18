import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRestaurantRoutingModule } from './edit-restaurant-routing.module';
import { EditRestaurantComponent } from './edit-restaurant.component';


@NgModule({
  declarations: [
    EditRestaurantComponent
  ],
  imports: [
    CommonModule,
    EditRestaurantRoutingModule
  ]
})
export class EditRestaurantModule { }
