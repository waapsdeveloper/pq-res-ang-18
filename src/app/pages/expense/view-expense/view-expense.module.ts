import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewExpenseRoutingModule } from './view-expense-routing.module';
import { ViewExpenseComponent } from './view-expense.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';

@NgModule({
  declarations: [ViewExpenseComponent],
  imports: [CommonModule, ViewExpenseRoutingModule, KtListDetailPageModule]
})
export class ViewExpenseModule {}
