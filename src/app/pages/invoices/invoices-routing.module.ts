import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    data: { breadcrumb: 'Invoices' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-invoices/list-invoices.module').then((m) => m.ListInvoicesModule),
      },
      {
        path: 'add',
        loadChildren: () => import('./add-invoices/add-invoices.module').then((m) => m.AddInvoicesModule)
      }
      ,
      {
        path: 'view/:id',
        loadChildren: () => import('./view-invoices/view-invoices.module').then((m) => m.ViewInvoicesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
