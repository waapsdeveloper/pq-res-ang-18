import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportSystemRoutingModule } from './report-system-routing.module';
import { OrderReportComponent } from './order-report/order-report.component';
import { FormsModule } from '@angular/forms';
import { BtopHeaderModule } from '../components/btop-header/btop-header.module';
import { SharedModule } from '../shared/shared.module';
import { ReportSystemComponent } from './report-system.component';


@NgModule({
  declarations: [
    OrderReportComponent,ReportSystemComponent
  ],
  imports: [
    CommonModule,
    ReportSystemRoutingModule,
    SharedModule,
    BtopHeaderModule,
    FormsModule

  ]
})
export class ReportSystemModule { }
