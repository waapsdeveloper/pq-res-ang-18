import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCouponsComponent } from './view-coupons.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCouponsComponent,
    data : {breadcrumbs: 'View'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCouponsRoutingModule { }
