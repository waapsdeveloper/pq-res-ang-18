import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexCustomerChartComponent } from './apex-customer-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    ApexCustomerChartComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  exports: [
    ApexCustomerChartComponent
  ]
})
export class ApexCustomerChartModule { }
