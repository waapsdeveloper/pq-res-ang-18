import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-project-stat',
  templateUrl: './project-stat.component.html',
  styleUrl: './project-stat.component.scss',
  imports: [CommonModule],
  standalone: true
})
export class ProjectStatComponent implements OnInit {
  products: any[];
  constructor(private network: NetworkService) {}
  async ngOnInit() {
    const data = await this.network.getMSellingProduct();
    const d = data.order_products;
    console.log(d);

    this.products = d.map(item => ({
     productId: item.product_id,
      name: item.name,
      description: item.description,
      price: parseFloat(item.price), // Convert price to number
      discount: parseFloat(item.discount), // Convert discount to number
      image: item.image,
      totalQuantitySold: item.total_quantity_sell

    }));
  console.log(this.products);

  }
}
