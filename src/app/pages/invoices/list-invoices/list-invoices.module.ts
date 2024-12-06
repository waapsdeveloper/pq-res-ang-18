import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListInvoicesRoutingModule } from './list-invoices-routing.module';
import { ListInvoicesComponent } from './list-invoices.component';


@NgModule({
  declarations: [
    ListInvoicesComponent
  ],
  imports: [
    CommonModule,
    ListInvoicesRoutingModule
  ]
})
export class ListInvoicesModule { }
