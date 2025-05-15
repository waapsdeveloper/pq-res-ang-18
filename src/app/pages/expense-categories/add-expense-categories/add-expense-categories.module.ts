import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenseCategoriesRoutingModule } from './add-expense-categories-routing.module';
import { AddExpenseCategoriesComponent } from './add-expense-categories.component';


@NgModule({
  declarations: [
    AddExpenseCategoriesComponent
  ],
  imports: [
    CommonModule,
    AddExpenseCategoriesRoutingModule
  ]
})
export class AddExpenseCategoriesModule { }
