import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCouponsComponent } from './edit-coupons.component';
const routes: Routes = [
  {
    path: '',
    component: EditCouponsComponent,

    data: { breadcrumb: 'Edit' },
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCouponsRoutingModule { }
