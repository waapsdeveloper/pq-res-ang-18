import { Component, OnInit, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common'; 
import { NgModel } from '@angular/forms';
import { ListOrdersComponent } from 'src/app/pages/orders/list-orders/list-orders.component';


import {
 
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  ApexTheme,
  ApexTooltip,
  NgApexchartsModule,
} from 'ng-apexcharts';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  colors: string[];
  stroke: ApexStroke;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  theme: ApexTheme;
};

@Component({
  selector: 'app-chart-order',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './chart-order.component.html',
  styleUrl: './chart-order.component.scss'
})
export class ChartOrderComponent implements OnInit{
   // public props
    @ViewChild('chart') chart!: ChartComponent;
    chartOptions!: Partial<ChartOptions>;
    amount: number = 961;
    btnActive!: string;
  
    // life cycle event
    ngOnInit() {
      this.btnActive = 'all';
      this.chartOptions = {
        chart: {
          type: 'line',
          height: 90,
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#FFF'],
        stroke: {
          curve: 'smooth',
          width: 3
        },
        series: [
          {
            name: 'series1',
            data: [35, 44, 9, 54, 45, 66, 41, 69]
          }
        ],
        yaxis: {
          min: 5,
          max: 95
        },
        tooltip: {
          theme: 'dark',
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          marker: {
            show: false
          }
        }
      };
    }
  // public method
toggleActive(value: string) {
  this.btnActive = value;
  switch (value) {
    case 'inProgress':
      this.chartOptions.series = [{
        name: 'series1',
        data: [10, 20, 30, 40, 50] // Data for in-progress orders
      }];
      this.amount = 90; // Amount for in-progress orders
      break;
    case 'completed':
      this.chartOptions.series = [{
        name: 'series1',
        data: [60, 70, 80, 90, 100] // Data for completed orders
      }];
      this.amount = 60; // Amount for completed orders
      break;
    case 'all':
      this.chartOptions.series = [{
        name: 'series1',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] // Data for all orders
      }];
      this.amount = 150; // Amount for all orders
      break;
  }
}}
