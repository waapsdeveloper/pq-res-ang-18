import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewExpenseCategoriesComponent } from './view-expense-categories.component';

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
export class ViewExpenseCategoriesRoutingModule {}
