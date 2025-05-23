import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderPriceListComponent } from './add-order-price-list.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddOrderPriceListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPopoverModule
  ],
  exports: [
    AddOrderPriceListComponent
  ]
})
export class AddOrderPriceListModule { }
