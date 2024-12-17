import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTableBookingComponent } from './add-table-booking.component';
const routes: Routes = [
  {
      path: '',
      component: AddTableBookingComponent,
      data: { breadcrumb: 'add' },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTableBookingRoutingModule { }
