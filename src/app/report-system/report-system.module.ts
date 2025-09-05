import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportSystemRoutingModule } from './report-system-routing.module';
import { OrderReportComponent } from './order-report/order-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BtopHeaderModule } from '../components/btop-header/btop-header.module';
import { SharedModule } from '../shared/shared.module';
import { ReportSystemComponent } from './report-system.component';
import { FormlyModule } from "@ngx-formly/core";
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { PipesModule } from '../pipes/pipes.module';
import { ProductReportComponent } from './product-report/product-report.component';


@NgModule({
  declarations: [
    OrderReportComponent,ReportSystemComponent, ProductReportComponent
  ],
  imports: [
    CommonModule,
    ReportSystemRoutingModule,
    SharedModule,
    BtopHeaderModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    PipesModule
]
})
export class ReportSystemModule { }
