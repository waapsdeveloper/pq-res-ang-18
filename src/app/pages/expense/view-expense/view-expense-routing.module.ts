import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewExpenseCategoriesComponent } from '../../expense-categories/view-expense-categories/view-expense-categories.component';
import { ViewExpenseComponent } from './view-expense.component';

const routes: Routes = [
  {
    path: '',
    component: ViewExpenseComponent,
    data: { breadcrumb: 'view' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewExpenseRoutingModule {}
