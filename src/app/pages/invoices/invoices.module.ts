import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { FormsModule } from '@angular/forms';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
    BtopHeaderModule,
    FormsModule
  ]
})
export class InvoicesModule { }
