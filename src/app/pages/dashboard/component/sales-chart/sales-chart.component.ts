import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-sales-chart',
  standalone: false,
  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.scss'
})
export class SalesChartComponent implements OnInit {
  public chartOptions: any;
  async ngOnInit() {
    this.fetchChartData();
    const res = await this.network.getTotalSales();
    console.log(res);
  }
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

  // Fetch data from the API and update chart options
  async fetchChartData() {
    // Fetch data from API
    const apiResponse = await this.network.getTotalSales();

    // Ensure data values are parsed as numbers and x-axis categories are set
    const formattedData = apiResponse.series[0].data.map((value) => parseFloat(value)); // Parse data values as numbers
    const formattedCategories = apiResponse.xaxis.categories; // Use categories from the response
   console.log(formattedData);
    // Update chart options
    this.chartOptions = {
      ...this.chartOptions, // Keep existing options
      series: [
        {
          name: 'Sales',
          data: formattedData // Update series data
        }
      ],
      xaxis: {
        categories: formattedCategories // Update x-axis categories
      }
    };
  }
}
