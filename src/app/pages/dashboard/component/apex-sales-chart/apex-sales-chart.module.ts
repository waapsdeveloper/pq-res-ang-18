import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexSalesChartComponent } from './apex-sales-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [ApexSalesChartComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  exports: [
    ApexSalesChartComponent
  ]
})
export class ApexSalesChartModule { }
