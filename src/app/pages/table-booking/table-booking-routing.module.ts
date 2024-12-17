import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableBookingComponent } from './table-booking.component';
import { TableBookingModule } from './table-booking.module';
const routes: Routes = [
  {
    path: '',
    component: TableBookingComponent,
    data: { breadcrumb: 'User' },
    children: [
      {
        path: '',

        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('./list-table-booking/list-table-booking.module').then((m) => m.ListTableBookingModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-table-booking/add-table-booking.module').then((m) => m.AddTableBookingModule)
      },
      {
        path: 'view/:id',
        loadChildren: () => import('./view-table-booking/view-table-booking.module').then((m) => m.ViewTableBookingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableBookingRoutingModule { }
