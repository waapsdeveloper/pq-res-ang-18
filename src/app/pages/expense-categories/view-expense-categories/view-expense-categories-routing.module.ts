import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewExpenseComponent } from '../../expense/view-expense/view-expense.component';

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
export class ViewExpenseCategoriesRoutingModule {}
