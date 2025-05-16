import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewExpenseCategoriesRoutingModule } from './view-expense-categories-routing.module';
import { ViewExpenseCategoriesComponent } from './view-expense-categories.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';

@NgModule({
  declarations: [ViewExpenseCategoriesComponent],
  imports: [CommonModule, ViewExpenseCategoriesRoutingModule, KtListDetailPageModule]
})
export class ViewExpenseCategoriesModule {}
