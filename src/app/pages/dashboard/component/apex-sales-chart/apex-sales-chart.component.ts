import { Component, ViewChild } from '@angular/core';

import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import { NetworkService } from 'src/app/services/network.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: any;
  dataLabels: any;
  plotOptions: any;
};

@Component({
  selector: 'app-apex-sales-chart',
  templateUrl: './apex-sales-chart.component.html',
  styleUrl: './apex-sales-chart.component.scss'
})
export class ApexSalesChartComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  btnActive: string = 'month';
  amount;

  constructor(private network: NetworkService) {
    this.chartOptions = {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false // Hides the menu to download SVG, PNG, etc.
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'center' // Position labels at the top of the bars
          }
        }
      },
      dataLabels: {
        enabled: true, // Enable data labels
        formatter: function (val: number) {
          return `$${val}K`; // Add $ as a prefix
        },
        style: {
          fontSize: '12px',
          colors: ['#fff'] // White color for bar labels
        },
        offsetY: -5 // Adjust position if necessary
      },
      series: [
        {
          name: '2023',
          type: 'line',
          data: [45, 60, 75, 80, 100, 70, 65, 80, 85]
        },
        {
          name: '2022',
          type: 'area',
          data: [30, 50, 65, 75, 85, 60, 50, 70, 75]
        }
      ],
      xaxis: {
        categories: []
      },
      colors: ['#d1d5db', '#f79a21'], // Blue for 2023, Gray for 2022
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
    this.toggleActive(this.btnActive);
  }

  currentDate = new Date().toISOString().split('T')[0];
  async toggleActive(value: string) {
    this.btnActive = value;

    if (value == 'day') {
      let obj = {
        param: this.btnActive,
        date: new Date().toISOString()
      };
      let data = await this.network.getSalesChartData(obj);
      console.log(data);

      this.chartOptions.series = [
        {
          name: 'Last Day',
          data: data.series[0].data
        },
        {
          name: this.currentDate,
          data: data.series[1].data
        }
      ];

      this.chartOptions.xaxis = {
        ...this.chartOptions.xaxis, // Keep existing xaxis properties
        categories: data.categories // Update categories dynamically
      };
      let v = this.chartOptions.series[0].data.reduce((a: number, b: number) => a + b, 0) as number;
      console.log(v);
      this.amount =  v != null ? v.toFixed(2) : "0.00";

      return;
    }

    if (value == 'week') {
      let obj = {
        param: this.btnActive,
        date: new Date().toISOString()
      };
      let data = await this.network.getSalesChartData(obj);
      console.log(data);

      this.chartOptions.series = [
        {
          name: 'Last Week',
          data: data.series[0].data
        },
        {
          name: 'This week',
          data: data.series[1].data
        }
      ];
      this.chartOptions.xaxis = {
        ...this.chartOptions.xaxis, // Keep existing xaxis properties
        categories: data.categories // Update categories dynamically
      };

      let v = this.chartOptions.series[0].data.reduce((a: number, b: number) => a + b, 0) as number;
      console.log(v);

      this.amount = this.formatAmount(v);
      return;
    }

    if (value == 'month') {
      let obj = {
        param: this.btnActive,
        date: new Date().toISOString()
      };
      let data = await this.network.getSalesChartData(obj);
      console.log(data);

      this.chartOptions.series = [
        {
          name: 'Last Month',
          data: data.series[0].data
        },
        {
          name: 'This Month',
          data: data.series[1].data
        }
      ];
      this.chartOptions.xaxis = {
        ...this.chartOptions.xaxis, // Keep existing xaxis properties
        categories: data.categories // Update categories dynamically
      };
      let v = this.chartOptions.series[0].data.reduce((a: number, b: number) => a + b, 0) as number;
      console.log(v);
      this.amount = this.formatAmount(v);

      return;
    }

    this.chartOptions.series = [
      {
        name: '2023',
        data:
          value === 'year'
            ? [45, 60, 75, 80, 100, 70, 65, 80, 85] // Yearly data
            : value === 'month'
              ? [45, 66, 41, 89, 25, 44, 9, 54, 70, 65, 80, 85] // Monthly data for 12 months
              : value === 'day'
                ? [12, 15, 20, 18, 22, 24, 19, 25, 28, 30, 27, 26, 24, 22, 20, 18, 15, 14, 17, 20, 21, 19, 15, 14] // Hourly data for "Today"
                : [] // Default fallback
      },
      {
        name: '2022',
        data:
          value === 'year'
            ? [30, 50, 65, 75, 85, 60, 50, 70, 75] // Yearly data
            : value === 'month'
              ? [35, 44, 9, 54, 45, 66, 41, 69, 55, 60, 58, 70] // Monthly data for 12 months
              : value === 'day'
                ? [10, 12, 15, 13, 17, 19, 14, 18, 21, 22, 20, 18, 16, 14, 12, 11, 10, 13, 16, 19, 20, 18, 16, 14] // Hourly data for "Yesterday"
                : [] // Default fallback
      }
    ];

    // this.amount = value === 'month' ? 108 : 961;
  }
  formatAmount(value: number): string {
    if (value >= 1_000_000_000) {
      return Math.round(value / 1_000_000_000_000) + 'T';
    } else if (value >= 1_000_000_000) {
      return Math.round(value / 1_000_000_000) + 'B';
    } else if (value >= 1_000_000) {
      return Math.round(value / 1_000_000) + 'M';
    } else if (value >= 1_000) {
      return Math.round(value / 1_000) + 'K';
    } else {
      return value.toString(); // Return the number as-is if less than 1000
    }
  }

  async ngOnInit() {}
}
