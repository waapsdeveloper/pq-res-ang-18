import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExpenseComponent } from '../../expense/edit-expense/edit-expense.component';
import { EditExpenseCategoriesComponent } from './edit-expense-categories.component';

const routes: Routes = [
  {
    path: '',
    component: EditExpenseCategoriesComponent,
    data: { breadcrumb: 'edit' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditExpenseCategoriesRoutingModule {}
