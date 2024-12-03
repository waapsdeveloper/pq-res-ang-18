import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRestaurantRoutingModule } from './view-restaurant-routing.module';
import { ViewRestaurantComponent } from './view-restaurant.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';


@NgModule({
  declarations: [
    ViewRestaurantComponent
  ],
  imports: [
    CommonModule,
    ViewRestaurantRoutingModule,
    KtListDetailPageModule
  ]
})
export class ViewRestaurantModule { }
