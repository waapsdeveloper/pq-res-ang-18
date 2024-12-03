import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductsComponent } from './view-products.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProductsComponent,
    data: { breadcrumb: 'View' },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProductsRoutingModule { }
