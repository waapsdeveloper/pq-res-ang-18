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

  constructor(private network : NetworkService) {
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

      // Parse data for monthly statistics
      const categories = response[1].monthly_data.map((item: any) => `Month ${item.in_months}`);
      const totalCustomers = response[1].monthly_data.map((item: any) => item.total_customers);

      // Use the same value for all months (adjust based on actual data logic)
      const newCustomers = Array(response[1].monthly_data.length).fill(response[1].new_customers);
      const returningCustomers = Array(response[1].monthly_data.length).fill(response[1].returning_customers);

      // Update chart options
      this.chartOptions.series = [
        { name: 'New Customers', data: newCustomers },
        { name: 'Returning Customers', data: returningCustomers },
        { name: 'Total Customers', data: totalCustomers }
      ];
      this.chartOptions.xaxis.categories = categories;


  }

}
