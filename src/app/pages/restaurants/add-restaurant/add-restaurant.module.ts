import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRestaurantRoutingModule } from './add-restaurant-routing.module';
import { AddRestaurantComponent } from './add-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddRestaurantComponent
  ],
  imports: [
    CommonModule,
    AddRestaurantRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddRestaurantModule { }
