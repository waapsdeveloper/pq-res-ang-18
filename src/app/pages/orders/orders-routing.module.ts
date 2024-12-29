import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';

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
      },
      {
        path: 'add',
        loadChildren: () => import('./add-orders/add-orders.module').then((m) => m.AddOrdersModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-orders/view-orders.module').then((m) => m.ViewOrdersModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-order/edit-order.module').then((m) => m.EditOrderModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
