import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantMenuRoutingModule } from './restaurant-menu-routing.module';
import { RestaurantMenuComponent } from './restaurant-menu.component';

import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    RestaurantMenuComponent
  ],
  imports: [
    CommonModule,
    RestaurantMenuRoutingModule,
    DragDropModule
  ]
})
export class RestaurantMenuModule { }
