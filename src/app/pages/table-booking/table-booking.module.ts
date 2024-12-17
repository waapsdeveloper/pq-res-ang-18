import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBookingRoutingModule } from './table-booking-routing.module';
import { TableBookingComponent } from './table-booking.component';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TableBookingComponent
  ],
  imports: [
    CommonModule,
    TableBookingRoutingModule,
    SharedModule,
    BtopHeaderModule,
    FormsModule
  ]
})
export class TableBookingModule { }
