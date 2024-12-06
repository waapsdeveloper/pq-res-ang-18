import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddInvoicesRoutingModule } from './add-invoices-routing.module';
import { AddInvoicesComponent } from './add-invoices.component';


@NgModule({
  declarations: [
    AddInvoicesComponent
  ],
  imports: [
    CommonModule,
    AddInvoicesRoutingModule
  ]
})
export class AddInvoicesModule { }
