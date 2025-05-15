import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewExpenseCategoriesRoutingModule } from './view-expense-categories-routing.module';
import { ViewExpenseCategoriesComponent } from './view-expense-categories.component';


@NgModule({
  declarations: [
    ViewExpenseCategoriesComponent
  ],
  imports: [
    CommonModule,
    ViewExpenseCategoriesRoutingModule
  ]
})
export class ViewExpenseCategoriesModule { }
