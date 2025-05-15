import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense.component';
const routes: Routes = [
  {
    path: '',
    component: ExpenseComponent,
    data: { breadcrumb: 'Expense' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-expense/list-expense.module').then((m) => m.ListExpenseModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-expense/add-expense.module').then((m) => m.AddExpenseModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-expense/view-expense.module').then((m) => m.ViewExpenseModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-expense/edit-expense.module').then((m) => m.EditExpenseModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule {}
