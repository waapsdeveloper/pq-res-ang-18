import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTableBookingComponent } from './view-table-booking.component';
const routes: Routes = [
   {
      path: '',
      component: ViewTableBookingComponent,
      data: { breadcrumb: 'View' },
  
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTableBookingRoutingModule { }
