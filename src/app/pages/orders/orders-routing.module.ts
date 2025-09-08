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
        path: 'history/:id',
        loadChildren: () => import('./order-history/order-history.module').then((m) => m.OrderHistoryModule),
        data: { entity: 'order', action: 'history' },
        canActivate: [permissionGuard]
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-order/edit-order.module').then((m) => m.EditOrderModule),
        data: { entity: 'order', action: 'edit' },
        canActivate: [permissionGuard]
      },
      {
        path: 'deleted',
        loadChildren: () => import('./list-orders/list-orders.module').then((m) => m.ListOrdersModule),
        data: { entity: 'order', action: 'list', isDeleted: true },
        canActivate: [permissionGuard]
      },
      {
        path: 'deleted/view/:id',
        loadChildren: () => import('./view-orders/view-orders.module').then((m) => m.ViewOrdersModule),
        data: { entity: 'order', action: 'view', isDeleted: true },
        canActivate: [permissionGuard]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
