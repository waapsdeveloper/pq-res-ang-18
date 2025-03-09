import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponsComponent } from './coupons.component';

const routes: Routes = [
  {
    path: '',
    component: CouponsComponent,
    data: { breadcrumb: 'Coupons ' },
    children: [
      {
        path: '',

        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-coupons/list-coupons.module').then((m) => m.ListCouponsModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-coupons/add-coupons.module').then((m) => m.AddCouponsModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-coupons/view-coupons.module').then((m) => m.ViewCouponsModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-coupons/edit-coupons.module').then((m) => m.EditCouponsModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
