import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStatComponent } from './component/project-stat/project-stat.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartDataMonthComponent } from 'src/app/demo/default/chart-data-month/chart-data-month.component';
import { ChartOrderComponent } from './component/chart-order/chart-order.component';
// import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BajajChartComponent } from 'src/app/demo/default/bajaj-chart/bajaj-chart.component';
import { BarChartComponent } from 'src/app/demo/default/bar-chart/bar-chart.component';
import { NavBarComponent } from 'src/app/theme/layout/admin/nav-bar/nav-bar.component';
import { NavBarModule } from 'src/app/theme/layout/admin/nav-bar/nav-bar.module';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SalesChartComponent } from './component/sales-chart/sales-chart.component';
import { RecentOrderComponent } from './component/recent-order/recent-order.component';
import { OrderStatusComponent } from './component/order-status/order-status.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexSalesChartComponent } from './component/apex-sales-chart/apex-sales-chart.component';
import { ApexSalesChartModule } from './component/apex-sales-chart/apex-sales-chart.module';
import { ApexTopSalesChartModule } from './component/apex-top-sales-chart/apex-top-sales-chart.module';
import { ApexCustomerChartModule } from './component/apex-customer-chart/apex-customer-chart.module';
import { FavouriteTableModule } from './component/favourite-table/favourite-table.module';
import { SalesChartModule } from './component/sales-chart/sales-chart.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [DashboardComponent, RecentOrderComponent, ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,




    // APEX CHART
    ApexSalesChartModule,
    ApexTopSalesChartModule,
    ApexCustomerChartModule,
    // APEX CHART

    BajajChartComponent,
    BarChartComponent,
    ChartDataMonthComponent,
    NavBarModule,
    BtopHeaderModule,
    ChartOrderComponent,
    ProjectStatComponent,
    OrderStatusComponent,
    FavouriteTableModule,
    SalesChartModule,


  ]
})
export class DashboardModule {}
