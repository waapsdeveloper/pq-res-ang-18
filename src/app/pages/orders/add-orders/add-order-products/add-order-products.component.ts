import { Component } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { AddOrderService } from '../add-order.service';

@Component({
  selector: 'app-add-order-products',
  templateUrl: './add-order-products.component.html',
  styleUrl: './add-order-products.component.scss'
})
export class AddOrderProductsComponent {



  constructor(public orderService: AddOrderService) {

  }

  async initialize() {


  }

  setSelectedToggle(product) {
    product.selected = !product.selected;
    this.orderService.updateProductInSelectedProducts(product);
  }

  isProductSelected(productId: any): boolean {
    // Check if a product with the given ID exists in the selected_products array
    return this.orderService.selected_products.some(product => product.id === productId);
  }
}
