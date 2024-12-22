import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: any;
  dataLabels: any;
};

@Component({
  selector: 'app-apex-sales-chart',
  templateUrl: './apex-sales-chart.component.html',
  styleUrl: './apex-sales-chart.component.scss'
})
export class ApexSalesChartComponent {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  btnActive: string = 'year';
  amount;

  constructor() {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false // Hides the menu to download SVG, PNG, etc.
        }
      },
      dataLabels: {
        enabled: false // Disables labels over the chart
      },
      series: [
        {
          name: '2023',
          data: [45, 60, 75, 80, 100, 70, 65, 80, 85]
        },
        {
          name: '2022',
          data: [30, 50, 65, 75, 85, 60, 50, 70, 75]
        }
      ],
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      colors: ['#007bff', '#d1d5db'], // Blue for 2023, Gray for 2022
      legend: {
        position: 'top',
        markers: {
          show: false // Optionally disable legend markers
        }
      }
    };

    let v = this.chartOptions.series[0].data.reduce((a: number, b: number) => a + b, 0) as number;
    console.log(v);
    this.amount = `${v}`;
  }

  toggleActive(value: string) {
    this.btnActive = value;
    this.chartOptions.series = [
      {
        name: '2023',
        data: value === 'year'
          ? [45, 60, 75, 80, 100, 70, 65, 80, 85] // Yearly data
          : value === 'month'
          ? [45, 66, 41, 89, 25, 44, 9, 54, 70, 65, 80, 85] // Monthly data for 12 months
          : value === 'day'
          ? [12, 15, 20, 18, 22, 24, 19, 25, 28, 30, 27, 26, 24, 22, 20, 18, 15, 14, 17, 20, 21, 19, 15, 14] // Hourly data for "Today"
          : [] // Default fallback
      },
      {
        name: '2022',
        data: value === 'year'
          ? [30, 50, 65, 75, 85, 60, 50, 70, 75] // Yearly data
          : value === 'month'
          ? [35, 44, 9, 54, 45, 66, 41, 69, 55, 60, 58, 70] // Monthly data for 12 months
          : value === 'day'
          ? [10, 12, 15, 13, 17, 19, 14, 18, 21, 22, 20, 18, 16, 14, 12, 11, 10, 13, 16, 19, 20, 18, 16, 14] // Hourly data for "Yesterday"
          : [] // Default fallback
      }
    ];

    let v = this.chartOptions.series[0].data.reduce((a: number, b: number) => a + b, 0) as number;
    console.log(v);
    this.amount = `${v}`;


    // this.amount = value === 'month' ? 108 : 961;
  }

}
