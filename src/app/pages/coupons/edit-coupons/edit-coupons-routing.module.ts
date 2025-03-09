import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCouponsComponent } from '../add-coupons/add-coupons.component';

const routes: Routes = [
  {
    path: '',
    component: AddCouponsComponent,

    data: { breadcrumb: 'Add' },
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCouponsRoutingModule { }
