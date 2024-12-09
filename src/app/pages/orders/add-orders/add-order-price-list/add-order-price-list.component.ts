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
  
  editNote(item: any): void {
    item.isEditingNote = true;
  }
  saveNote(item: any): void {
    item.isEditingNote = false;
    // Additional logic to save the note to a backend or local storage can be added here
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
