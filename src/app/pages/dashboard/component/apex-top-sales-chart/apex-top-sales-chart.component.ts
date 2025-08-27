import { NetworkService } from 'src/app/services/network.service';
import { Component } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-apex-top-sales-chart',
  templateUrl: './apex-top-sales-chart.component.html',
  styleUrl: './apex-top-sales-chart.component.scss'
})
export class ApexTopSalesChartComponent {
  public chartOptions: any;
  selectedPeriod: string = 'monthly'; // Default period

  constructor(
    private network: NetworkService,
    private globalData: GlobalDataService
  ) {}

  async ngOnInit() {
    await this.fetchTopSellingProducts('monthly'); // Default fetch for monthly data
  }

  async onPeriodChange(event: any) {
    this.selectedPeriod = event.target.value; // Update the selected period
    const restaurantId = this.globalData.getRestaurantId(); // Get the restaurant ID from global data

    await this.fetchTopSellingProducts(this.selectedPeriod, restaurantId.toString()); // Fetch data based on the selected period
  }

  async fetchTopSellingProducts(filter: string, restaurant_id?: string) {
    const params: any = { filter };
    if (restaurant_id) {
      params.restaurant_id = restaurant_id; // Add restaurant_id to query params if provided
    }
    try {
      const data = await this.network.getTopSellingProduct(params);
      const d = data.order_products;

      // Map the series to numerical values and remove the '%' symbol
      const totalQuantitiesSold = d.series; //.map((value) => parseFloat(value.replace('%', '')));
      // Extract labels as they are
      const productNames = d.labels;

      // Update the chart options
      this.chartOptions = {
        series: totalQuantitiesSold, // Numerical data for the pie chart
        chart: {
          type: 'pie',
          height: 360
        },
        labels: productNames, // Product names
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] // Custom colors
      };
    } catch (error) {
      console.error('Error fetching top-selling products:', error);
    }
  }
}
