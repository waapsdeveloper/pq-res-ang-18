import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from '../../expense/add-expense/add-expense.component';
import { AddExpenseCategoriesComponent } from './add-expense-categories.component';

const routes: Routes = [
  {
    path: '',
    component: AddExpenseCategoriesComponent,
    data: { breadcrumb: 'add' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExpenseCategoriesRoutingModule {}
