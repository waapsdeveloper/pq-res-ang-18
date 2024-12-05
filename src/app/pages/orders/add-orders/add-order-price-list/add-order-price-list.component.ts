import { Component } from '@angular/core';
import { AddOrderService } from '../add-order.service';

@Component({
  selector: 'app-add-order-price-list',
  templateUrl: './add-order-price-list.component.html',
  styleUrl: './add-order-price-list.component.scss'
})
export class AddOrderPriceListComponent {

  constructor(public orderService: AddOrderService){

  }

  removeItem(i){
      this.orderService.removeProductInSelectedProducts(i)
  }

  parseTwoDigitNumber(n){
    return n < 10 ? `0${n}` : n;
  }

  returnListItemCost(item){
    return item.quantity * item.price;
  }

  changeQty(item){
    this.orderService.totalOfProductCost();
  }
}
