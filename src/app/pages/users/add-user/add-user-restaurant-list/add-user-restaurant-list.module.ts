import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserRestaurantListComponent } from './add-user-restaurant-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddUserRestaurantListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddUserRestaurantListComponent
  ]
})
export class AddUserRestaurantListModule { }
