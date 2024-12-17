import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTableBookingRoutingModule } from './add-table-booking-routing.module';
import { AddTableBookingComponent } from './add-table-booking.component';


@NgModule({
  declarations: [
    AddTableBookingComponent
  ],
  imports: [
    CommonModule,
    AddTableBookingRoutingModule
  ]
})
export class AddTableBookingModule { }
