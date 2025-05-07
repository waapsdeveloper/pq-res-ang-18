import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexTopSalesChartComponent } from './apex-top-sales-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ApexTopSalesChartComponent],
  imports: [CommonModule, NgApexchartsModule, FormsModule],
  exports: [ApexTopSalesChartComponent]
})
export class ApexTopSalesChartModule {}
