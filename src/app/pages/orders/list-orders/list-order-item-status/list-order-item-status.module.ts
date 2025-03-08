import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrderItemStatusComponent } from './list-order-item-status.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListOrderItemStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ListOrderItemStatusComponent]
})
export class ListOrderItemStatusModule { }
