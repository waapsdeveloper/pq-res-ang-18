import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCouponsComponent } from './list-coupons.component';

const routes: Routes = [
  {
    path: '',
    component: ListCouponsComponent,
    data: { breadcrumb: 'list' },
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCouponsRoutingModule { }
