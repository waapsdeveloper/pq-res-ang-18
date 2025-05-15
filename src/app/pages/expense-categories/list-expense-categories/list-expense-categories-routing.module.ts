import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListExpenseCategoriesComponent } from './list-expense-categories.component';
import { ListExpenseComponent } from '../../expense/list-expense/list-expense.component';

const routes: Routes = [
  {
    path: '',
    component: ListExpenseCategoriesComponent,
    data: { breadcrumb: 'list' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListExpenseCategoriesRoutingModule {}
