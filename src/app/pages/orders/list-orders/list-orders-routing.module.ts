import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrdersComponent } from './list-orders.component';

const routes: Routes = [
  {
    path: '',
    component: ListOrdersComponent,
    data: { breadcrumb: 'list' }, // Root breadcrumb
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOrdersRoutingModule { }
