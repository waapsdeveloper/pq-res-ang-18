import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { permissionGuard } from '../../guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    data: { breadcrumb: 'Order' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-orders/list-orders.module').then((m) => m.ListOrdersModule),
        data: { entity: 'order', action: 'list' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-orders/add-orders.module').then((m) => m.AddOrdersModule),
        data: { entity: 'order', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add/:id',
        loadChildren: () => import('./add-orders/add-orders.module').then((m) => m.AddOrdersModule),
        data: { entity: 'order', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-orders/view-orders.module').then((m) => m.ViewOrdersModule),
        data: { entity: 'order', action: 'view' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-order/edit-order.module').then((m) => m.EditOrderModule),
        data: { entity: 'order', action: 'edit' },
        canActivate: [permissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
