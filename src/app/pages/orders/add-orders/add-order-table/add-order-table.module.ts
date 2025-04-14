import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderTableComponent } from './add-order-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddOrderTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
  ],
  exports: [AddOrderTableComponent],
})
export class AddOrderTableModule { }
