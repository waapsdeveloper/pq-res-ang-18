import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInvoicesComponent } from './add-invoices.component';

const routes: Routes = [  {
  path: '',
  component: AddInvoicesComponent,
  data: { breadcrumb: 'Add' },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddInvoicesRoutingModule { }
