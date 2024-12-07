import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewInvoicesComponent } from './view-invoices.component';

const routes: Routes = [{
  path: '',
  component: ViewInvoicesComponent,
  data: { breadcrumb: 'View' },

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewInvoicesRoutingModule { }
