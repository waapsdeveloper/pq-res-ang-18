import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListExpenseCategoriesComponent } from '../../expense-categories/list-expense-categories/list-expense-categories.component';

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
export class ListExpenseRoutingModule {}
