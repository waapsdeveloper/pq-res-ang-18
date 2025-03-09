import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from '../../categories/add-category/add-category.component';
import { AddCouponsComponent } from './add-coupons.component';

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
export class AddCouponsRoutingModule { }
