import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInvoicesComponent } from './list-invoices.component';
const routes: Routes = [  {
  path: '',
  component: ListInvoicesComponent,
  data: { breadcrumb: 'list' }, // Root breadcrumb
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListInvoicesRoutingModule { }
