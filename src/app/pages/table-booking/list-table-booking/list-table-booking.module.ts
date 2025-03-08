import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTableBookingRoutingModule } from './list-table-booking-routing.module';
import { ListTableBookingComponent } from './list-table-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';
import { ListTableBookingStatusModule } from './list-table-booking-status/list-table-booking-status.module';


@NgModule({
  declarations: [
    ListTableBookingComponent
  ],
  imports: [
    CommonModule,
    ListTableBookingRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    ListTableBookingStatusModule
  
  ]
})
export class ListTableBookingModule { }
