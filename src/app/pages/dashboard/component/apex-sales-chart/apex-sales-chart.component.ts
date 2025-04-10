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
  styleUrls: ['./apex-sales-chart.component.scss']
})
export class ApexSalesChartComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  btnActive: string = 'month';
  amount: string;

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
        labels: {
          show: true // Ensure labels are visible
        },
        categories: [
          '2023-01-01',
          '2023-01-02',
          '2023-01-03',
          '2023-01-04',
          '2023-01-05',
          '2023-01-06',
          '2023-01-07',
          '2023-01-08',
          '2023-01-09'
        ] // Sample dates for the x-axis
      },
      colors: ['#d1d5db', '#f79a21'], // Blue for 2023, Gray for 2022
      legend: {
        position: 'top',
        markers: {
          show: false // Optionally disable legend markers
        }
      }
    };

    const v = this.chartOptions.series![0].data.reduce((a: number, b: number) => a + b, 0) as number;
    console.log(v);
    this.amount = `${v}`;
    this.toggleActive(this.btnActive);
  }

  currentDate = new Date().toISOString().split('T')[0];

  async toggleActive(value: string) {
    this.btnActive = value;

    const obj = {
      param: this.btnActive,
      date: new Date().toISOString()
    };

    const data = await this.network.getSalesChartData(obj);
    console.log(data);

    this.chartOptions.series = [
      {
        name: value === 'day' ? 'Last Day' : value === 'week' ? 'Last Week' : 'Last Month',
        data: data.series[0].data
      },
      {
        name: value === 'day' ? this.currentDate : value === 'week' ? 'This Week' : 'This Month',
        data: data.series[1].data
      }
    ];

    this.chartOptions.xaxis = {
      ...this.chartOptions.xaxis,
      categories:
        value === 'day'
          ? ['2023-01-01 00:00', '2023-01-01 01:00', '2023-01-01 02:00', '2023-01-01 03:00','2023-01-01 00:00', '2023-01-01 01:00', '2023-01-01 02:00', '2023-01-01 03:00',] // Sample hourly data
          : value === 'week'
            ? ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07','2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07'] // Sample daily data for a week
            : value === 'month'
              ? ['2023-01-01', '2023-01-05', '2023-01-10', '2023-01-15', '2023-01-20', '2023-01-25', '2023-01-30','2023-01-01', '2023-01-05', '2023-01-10', '2023-01-15', '2023-01-20', '2023-01-25', '2023-01-30'] // Sample dates for a month
              : ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07', '2023-08', '2023-09'] // Sample monthly data for a year
    };

    const v = this.chartOptions.series![0].data.reduce((a: number, b: number) => a + b, 0) as number;
    console.log(v);
    this.amount = this.formatAmount(v);
  }

  formatAmount(value: number): string {
    if (value >= 1_000_000_000) {
      return Math.round(value / 1_000_000_000) + 'B';
    } else if (value >= 1_000_000) {
      return Math.round(value / 1_000_000) + 'M';
    } else if (value >= 1_000) {
      return Math.round(value / 1_000) + 'K';
    } else {
      return value.toString(); // Return the number as-is if less than 1000
    }
  }

  async ngOnInit() {
    // Ensure any initialization logic is handled here
  }
}
