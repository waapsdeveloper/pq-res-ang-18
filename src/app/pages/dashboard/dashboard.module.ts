import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartDataMonthComponent } from 'src/app/demo/default/chart-data-month/chart-data-month.component';
import { ChartOrderComponent } from 'src/app/demo/default/chart-order/chart-order.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BajajChartComponent } from 'src/app/demo/default/bajaj-chart/bajaj-chart.component';
import { BarChartComponent } from 'src/app/demo/default/bar-chart/bar-chart.component';
import { NavBarComponent } from 'src/app/theme/layout/admin/nav-bar/nav-bar.component';
import { NavBarModule } from 'src/app/theme/layout/admin/nav-bar/nav-bar.module';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SalesChartComponent } from 'src/app/demo/default/sales-chart/sales-chart.component';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    BajajChartComponent,
    BarChartComponent,
    ChartDataMonthComponent,
    NavBarModule,
    BtopHeaderModule,
    ChartOrderComponent,
    SalesChartComponent

  ]
})
export class DashboardModule {}
