import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderReportComponent } from './order-report/order-report.component';
import { ReportSystemComponent } from './report-system.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders/daily',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    component: ReportSystemComponent, // parent wrapper
    data: { breadcrumb: 'Orders' },
    children: [
      {
        path: 'daily',
        component: OrderReportComponent,
        data: { entity: 'order', action: 'report', type: 'daily', breadcrumb: 'Daily' }
      },
      {
        path: 'monthly',
        component: OrderReportComponent,
        data: { entity: 'order', action: 'report', type: 'monthly', breadcrumb: 'Monthly' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSystemRoutingModule { }
