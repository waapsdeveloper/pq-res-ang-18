import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponsComponent } from './coupons.component';
import { permissionGuard } from '../../guards/permission.guard';

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
        loadChildren: () => import('./list-coupons/list-coupons.module').then((m) => m.ListCouponsModule),
        data: { entity: 'coupon', action: 'list' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-coupons/add-coupons.module').then((m) => m.AddCouponsModule),
        data: { entity: 'coupon', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-coupons/view-coupons.module').then((m) => m.ViewCouponsModule),
        data: { entity: 'coupon', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-coupons/edit-coupons.module').then((m) => m.EditCouponsModule),
        data: { entity: 'coupon', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
