import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexTooltip, ApexLegend } from 'ng-apexcharts';

@Component({
  selector: 'app-apex-customer-chart',
  templateUrl: './apex-customer-chart.component.html',
  styleUrl: './apex-customer-chart.component.scss'
})
export class ApexCustomerChartComponent {

  public chartOptions: any;

  constructor() {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 360,
        toolbar: {
          show: false // Hides the menu to download SVG, PNG, etc.
        }
      },
      dataLabels: {
        enabled: false // Disables labels over the chart
      },
      series: [
        {
          name: 'New Customers',
          data: [20, 35, 50, 60, 45, 75, 80]
        },
        {
          name: 'Returning Customers',
          data: [15, 25, 40, 55, 70, 65, 90]
        },
        {
          name: 'Total Customers',
          data: [35, 60, 90, 115, 115, 140, 170]
        }
      ],
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      },

      tooltip: {
        shared: true,
        intersect: false
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: true
      }
    };
  }

}
