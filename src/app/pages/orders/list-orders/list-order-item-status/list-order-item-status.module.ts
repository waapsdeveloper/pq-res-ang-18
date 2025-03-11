import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrderItemStatusComponent } from './list-order-item-status.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ListOrderItemStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule
  ],
  exports: [ListOrderItemStatusComponent]
})
export class ListOrderItemStatusModule { }
