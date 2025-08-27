import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderReportComponent } from './order-report/order-report.component';
import { ReportSystemComponent } from './report-system.component';
import { permissionGuard } from '../guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders/daily',
    pathMatch: 'full',
    data: { breadcrumb: 'Sales Report' },
    
  },
  {
    path: 'orders',
    component: ReportSystemComponent, // parent wrapper
    data: { breadcrumb: 'Orders' },
    
    children: [
      {
        path: 'daily',
        component: OrderReportComponent,
        data: { entity: 'report', action: 'daily_sale_report', type: 'daily', breadcrumb: 'Daily' },
        canActivate: [permissionGuard],
      },
      {
        path: 'monthly',
        component: OrderReportComponent,
        data: { entity: 'order', action: 'report', type: 'monthly', breadcrumb: 'Monthly' },
        canActivate: [permissionGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSystemRoutingModule { }
