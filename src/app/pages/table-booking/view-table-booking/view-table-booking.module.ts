import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTableBookingRoutingModule } from './view-table-booking-routing.module';
import { ViewTableBookingComponent } from './view-table-booking.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewTableBookingComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ViewTableBookingRoutingModule,
    KtListDetailPageModule

  ]
})
export class ViewTableBookingModule { }
