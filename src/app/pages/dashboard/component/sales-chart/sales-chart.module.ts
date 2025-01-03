import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesChartComponent } from './sales-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [SalesChartComponent],
  imports: [CommonModule, NgApexchartsModule],
  exports: [SalesChartComponent]
})
export class SalesChartModule {}
