import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense.component';
import { permissionGuard } from '../../guards/permission.guard';

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
        loadChildren: () => import('./list-expense/list-expense.module').then((m) => m.ListExpenseModule),
        data: { entity: 'expense', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-expense/add-expense.module').then((m) => m.AddExpenseModule),
        data: { entity: 'expense', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-expense/view-expense.module').then((m) => m.ViewExpenseModule),
        data: { entity: 'expense', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-expense/edit-expense.module').then((m) => m.EditExpenseModule),
        data: { entity: 'expense', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule {}
