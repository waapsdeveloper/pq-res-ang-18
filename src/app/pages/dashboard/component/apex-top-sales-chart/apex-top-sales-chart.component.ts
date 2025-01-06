import { NetworkService } from 'src/app/services/network.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-apex-top-sales-chart',
  templateUrl: './apex-top-sales-chart.component.html',
  styleUrl: './apex-top-sales-chart.component.scss'
})
export class ApexTopSalesChartComponent {
  public  chartOptions: any;

  constructor(private network: NetworkService) {}
  async ngOnInit() {
    const data = await this.network.getTopSellingProduct();
    const d = data.order_products;
    // Map the series to numerical values and remove the '%' symbol
    const totalQuantitiesSold = d.series.map((value) => parseFloat(value.replace('%', '')));
    // Extract labels as they are
    const productNames = d.labels;
    this.chartOptions = {
      series: totalQuantitiesSold, // Numerical data for the pie chart
      chart: {
        type: 'pie',
        height: 360
      },
      labels: productNames, // Product names
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] // Custom colors
    };
  }
}
