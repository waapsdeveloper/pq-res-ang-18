import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTableBookingRoutingModule } from './list-table-booking-routing.module';
import { ListTableBookingComponent } from './list-table-booking.component';


@NgModule({
  declarations: [
    ListTableBookingComponent
  ],
  imports: [
    CommonModule,
    ListTableBookingRoutingModule
  ]
})
export class ListTableBookingModule { }
