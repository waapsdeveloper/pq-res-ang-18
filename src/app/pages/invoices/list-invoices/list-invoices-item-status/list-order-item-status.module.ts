import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInvoiceItemStatusComponent } from './list-invoices-item-status.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ListInvoiceItemStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule
  ],
  exports: [ListInvoiceItemStatusComponent]
})
export class ListInvoicesItemStatusModule { }
