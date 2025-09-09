import { Component } from '@angular/core';
import { AddOrderService } from '../add-order.service';

@Component({
  selector: 'app-add-order-categories',
  templateUrl: './add-order-categories.component.html',
  styleUrl: './add-order-categories.component.scss'
})
export class AddOrderCategoriesComponent {
  constructor(public orderService: AddOrderService) { }

  setActiveCategory(item) {

    for (var i = 0; i < this.orderService.categories.length; i++) {
      this.orderService.categories[i]['active'] = this.orderService.categories[i]['name'] == item['name'];
    }

    // Fetch products
    this.orderService.updateProductsBySelectedCategory(item).then(() => {
      // ✅ Filter products to show only active ones
      this.orderService.products = this.orderService.products.filter(
        (p: any) => p.status === 'Active'
      );
    });

  }
}
