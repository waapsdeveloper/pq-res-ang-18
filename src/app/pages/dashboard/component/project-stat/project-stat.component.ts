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
      name: item.product.name,
      description: item.product.description,
      price: parseFloat(item.product.price), // Convert price to number
      discount: parseFloat(item.product.discount), // Convert discount to number
      image: item.product.image,
      totalQuantitySold: item.total_quantity_sell
    }));
  console.log(this.products);

  }
}
