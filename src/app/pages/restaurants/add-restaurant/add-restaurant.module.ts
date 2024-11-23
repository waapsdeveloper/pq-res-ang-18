import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRestaurantRoutingModule } from './add-restaurant-routing.module';
import { AddRestaurantComponent } from './add-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KtAppToolbarModule } from 'src/app/components/kt-app-toolbar/kt-app-toolbar.module';


@NgModule({
  declarations: [
    AddRestaurantComponent
  ],
  imports: [
    CommonModule,
    AddRestaurantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    KtAppToolbarModule,
  ]
})
export class AddRestaurantModule { }
