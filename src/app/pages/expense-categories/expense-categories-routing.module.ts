import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseCategoriesComponent } from './expense-categories.component';
import { permissionGuard } from '../../guards/permission.guard';

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
        loadChildren: () => import('./list-expense-categories/list-expense-categories.module').then((m) => m.ListExpenseCategoriesModule),
        data: { entity: 'expense_category', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-expense-categories/add-expense-categories.module').then((m) => m.AddExpenseCategoriesModule),
        data: { entity: 'expense_category', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-expense-categories/view-expense-categories.module').then((m) => m.ViewExpenseCategoriesModule),
        data: { entity: 'expense_category', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-expense-categories/edit-expense-categories.module').then((m) => m.EditExpenseCategoriesModule),
        data: { entity: 'expense_category', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseCategoriesRoutingModule {}
