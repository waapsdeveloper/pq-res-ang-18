import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexTopSalesChartComponent } from './apex-top-sales-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    ApexTopSalesChartComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  exports: [
    ApexTopSalesChartComponent
  ]
})
export class ApexTopSalesChartModule { }
