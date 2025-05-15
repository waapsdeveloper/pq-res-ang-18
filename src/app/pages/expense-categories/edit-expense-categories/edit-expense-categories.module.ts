import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditExpenseCategoriesRoutingModule } from './edit-expense-categories-routing.module';
import { EditExpenseCategoriesComponent } from './edit-expense-categories.component';


@NgModule({
  declarations: [
    EditExpenseCategoriesComponent
  ],
  imports: [
    CommonModule,
    EditExpenseCategoriesRoutingModule
  ]
})
export class EditExpenseCategoriesModule { }
