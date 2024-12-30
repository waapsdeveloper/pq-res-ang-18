import { NetworkService } from 'src/app/services/network.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-apex-top-sales-chart',
  templateUrl: './apex-top-sales-chart.component.html',
  styleUrl: './apex-top-sales-chart.component.scss'
})
export class ApexTopSalesChartComponent {
  chartOptions: any;
  constructor(private network: NetworkService) {}
  async ngOnInit() {
    const data = await this.network.getTopSellingProduct();
    console.log(data);
    const orderArray = data.order_products;
    const productNames = orderArray.map((item) => item.product.name);
    const totalQuantitiesSold = orderArray.map((item) => item.total_quantity_sell);

    this.chartOptions = {
      series: totalQuantitiesSold, // Total quantities sold for each product
      chart: {  
        type: 'pie',
        height: 360
      },
      labels: productNames, // Product names
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Custom colors (you can adjust based on your needs)
    };
  }
}
