import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseCategoriesComponent } from './expense-categories.component';
const routes: Routes = [
  {
    path: '',
    component: ExpenseCategoriesComponent,
    data: { breadcrumb: 'Expense Categories' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-expense-categories/list-expense-categories.module').then((m) => m.ListExpenseCategoriesModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-expense-categories/add-expense-categories.module').then((m) => m.AddExpenseCategoriesModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-expense-categories/view-expense-categories.module').then((m) => m.ViewExpenseCategoriesModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-expense-categories/edit-expense-categories.module').then((m) => m.EditExpenseCategoriesModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseCategoriesRoutingModule {}
