import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListExpenseComponent } from './list-expense.component';

const routes: Routes = [
  {
    path: '',
    component: ListExpenseComponent,
    data: { breadcrumb: 'list' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListExpenseRoutingModule {}
