import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewInvoicesRoutingModule } from './view-invoices-routing.module';
import { ViewInvoicesComponent } from './view-invoices.component';


@NgModule({
  declarations: [
    ViewInvoicesComponent
  ],
  imports: [
    CommonModule,
    ViewInvoicesRoutingModule
  ]
})
export class ViewInvoicesModule { }
