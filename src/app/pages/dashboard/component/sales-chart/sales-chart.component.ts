import { Component } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-sales-chart',
  standalone: false,
  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.scss'
})
export class SalesChartComponent {
  public chartOptions: any;
  constructor(private network: NetworkService) {
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
          name: 'Sales',
          data: [69, 35, 50, 60, 45, 75, 80]
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
