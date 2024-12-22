import { Component } from '@angular/core';

@Component({
  selector: 'app-apex-top-sales-chart',
  templateUrl: './apex-top-sales-chart.component.html',
  styleUrl: './apex-top-sales-chart.component.scss'
})
export class ApexTopSalesChartComponent {

  chartOptions: any;

  ngOnInit() {
    this.chartOptions = {
      series: [40, 25, 15, 10, 10], // Example data for top-selling items
      chart: {
        type: 'pie',
        height: 360
      },
      labels: ['Pizza', 'Burger', 'Pasta', 'Salad', 'Tacos'], // Item names
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Custom colors
    };
  }

}
