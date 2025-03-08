import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableBookingStatusComponent } from './list-table-booking-status.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListTableBookingStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ListTableBookingStatusComponent
  ]
})
export class ListTableBookingStatusModule { }
