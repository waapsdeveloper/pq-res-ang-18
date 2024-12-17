import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTableBookingComponent } from './list-table-booking.component';
const routes: Routes = [{
  path: '',
  component: ListTableBookingComponent,
  data: { breadcrumb: 'list' },
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTableBookingRoutingModule { }
