import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableBookingStatusComponent } from './list-table-booking-status.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ListTableBookingStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule
  ],
  exports: [
    ListTableBookingStatusComponent
  ]
})
export class ListTableBookingStatusModule { }
