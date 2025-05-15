import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListExpenseCategoriesRoutingModule } from './list-expense-categories-routing.module';
import { ListExpenseCategoriesComponent } from './list-expense-categories.component';


@NgModule({
  declarations: [
    ListExpenseCategoriesComponent
  ],
  imports: [
    CommonModule,
    ListExpenseCategoriesRoutingModule
  ]
})
export class ListExpenseCategoriesModule { }
