import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewOrdersComponent } from './view-orders.component';

const routes: Routes = [
  {
    path: '',
    component: ViewOrdersComponent,
    data: { breadcrumb: 'View' },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewOrdersRoutingModule { }
