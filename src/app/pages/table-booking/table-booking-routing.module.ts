import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableBookingComponent } from './table-booking.component';
import { permissionGuard } from '../../guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: TableBookingComponent,
    data: { breadcrumb: 'Bookings' },
    children: [
      {
        path: '',

        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-table-booking/list-table-booking.module').then((m) => m.ListTableBookingModule),
        data: { entity: 'table_booking', action: 'list' },
        canActivate: [permissionGuard]
      },
      {
        path: 'add',
        loadChildren: () => import('./add-table-booking/add-table-booking.module').then((m) => m.AddTableBookingModule),
        data: { entity: 'table_booking', action: 'add' },
        canActivate: [permissionGuard]
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-table-booking/view-table-booking.module').then((m) => m.ViewTableBookingModule),
        data: { entity: 'table_booking', action: 'view' },
        canActivate: [permissionGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableBookingRoutingModule { }
