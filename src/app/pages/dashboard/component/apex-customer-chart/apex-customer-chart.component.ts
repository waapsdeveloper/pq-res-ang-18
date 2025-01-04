import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexTooltip, ApexLegend } from 'ng-apexcharts';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-apex-customer-chart',
  templateUrl: './apex-customer-chart.component.html',
  styleUrl: './apex-customer-chart.component.scss'
})
export class ApexCustomerChartComponent implements OnInit {
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

  async ngOnInit() {
    // Fetch data from the network service
    const response = await this.network.getCustomerStat();

    const d = response.customers;

    // Extract categories (x-axis labels)
    const categories = d.xaxis.categories;

    // Extract series data directly
    const series = d.series.map((item) => ({
      name: item.name, // Series name
      data: item.data // Series data
    }));

    // Update chart options
    this.chartOptions = {
      series: series, // Series for the line chart
      chart: {
        type: 'line',
        height: 360,
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        categories: categories, // X-axis categories (days of the week)
        title: {
          text: 'Days'
        }
      },
      yaxis: {
        title: {
          text: 'Number of Customers'
        }
      },
     
      colors: ['#FF6384', '#36A2EB', '#FFCE56'], // Custom colors
      legend: {
        position: 'top'
      }
    };
  }
}
