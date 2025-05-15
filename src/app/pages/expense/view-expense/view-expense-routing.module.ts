import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewExpenseCategoriesComponent } from '../../expense-categories/view-expense-categories/view-expense-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ViewExpenseCategoriesComponent,
    data: { breadcrumb: 'view' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewExpenseRoutingModule {}
