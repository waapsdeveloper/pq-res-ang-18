import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-project-stat',
  templateUrl: './project-stat.component.html',
  styleUrl: './project-stat.component.scss',
  standalone: true
})
export class ProjectStatComponent implements OnInit {
  products: any[];
  constructor(private network: NetworkService) {}
  async ngOnInit() {
    const data = await this.network.getMSellingProduct();
    const d = data.order_products;
    console.log(data);

    this.products = d.map((item) => ({
      productId: item.product_id,
      name: item.product.name,
      description: item.product.description,
      price: parseFloat(item.product.price), // Assuming price is a string and needs to be converted to a number
      discount: parseFloat(item.product.discount), // Assuming discount is a string
      image: item.product.image,
      totalQuantitySold: item.total_quantity_sell
    }));
    console.log(this.products);
  }
}
