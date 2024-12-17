import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTableBookingRoutingModule } from './view-table-booking-routing.module';
import { ViewTableBookingComponent } from './view-table-booking.component';


@NgModule({
  declarations: [
    ViewTableBookingComponent
  ],
  imports: [
    CommonModule,
    ViewTableBookingRoutingModule
  ]
})
export class ViewTableBookingModule { }
