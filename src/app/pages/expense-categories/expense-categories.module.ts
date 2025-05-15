import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseCategoriesRoutingModule } from './expense-categories-routing.module';
import { ExpenseCategoriesComponent } from './expense-categories.component';


@NgModule({
  declarations: [
    ExpenseCategoriesComponent
  ],
  imports: [
    CommonModule,
    ExpenseCategoriesRoutingModule
  ]
})
export class ExpenseCategoriesModule { }
