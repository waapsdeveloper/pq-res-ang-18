import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTableBookingRoutingModule } from './add-table-booking-routing.module';
import { AddTableBookingComponent } from './add-table-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';


@NgModule({
  declarations: [
    AddTableBookingComponent
  ],
  imports: [
    CommonModule,
    AddTableBookingRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  
  ]
})
export class AddTableBookingModule { }
