import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListExpenseRoutingModule } from './list-expense-routing.module';
import { ListExpenseComponent } from './list-expense.component';


@NgModule({
  declarations: [
    ListExpenseComponent
  ],
  imports: [
    CommonModule,
    ListExpenseRoutingModule
  ]
})
export class ListExpenseModule { }
