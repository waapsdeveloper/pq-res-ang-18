import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewExpenseCategoriesComponent } from '../../expense-categories/view-expense-categories/view-expense-categories.component';
import { EditExpenseCategoriesComponent } from '../../expense-categories/edit-expense-categories/edit-expense-categories.component';
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
export class EditExpenseRoutingModule {}
