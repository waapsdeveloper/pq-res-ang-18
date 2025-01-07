import { Component, OnInit } from '@angular/core';
import { AddOrderService } from '../add-order.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-add-order-price-list',
  templateUrl: './add-order-price-list.component.html',
  styleUrl: './add-order-price-list.component.scss'
})
export class AddOrderPriceListComponent implements OnInit {
  constructor(
    public orderService: AddOrderService,
    public nav: NavService,
    private network: NetworkService
  ) {}
  async ngOnInit() {
    
  }

  editNote(item: any): void {
    item.isEditingNote = true;
  }
  saveNote(item: any): void {
    item.isEditingNote = false;
    // Additional logic to save the note to a backend or local storage can be added here
  }

  removeItem(i) {
    this.orderService.removeProductInSelectedProducts(i);
  }

  parseTwoDigitNumber(n) {
    return n < 10 ? `0${n}` : n;
  }

  returnListItemCost(item) {
    return item.quantity * item.price;
  }

  changeQty(item) {
    this.orderService.totalOfProductCost();
  }

  async onSubmit($event) {
    const res = await this.orderService.submitOrder();
    if (res) {
      this.nav.pop();
    }
  }
  popovers: NgbPopover[] = [];

  closeAllPopovers() {
    this.popovers.forEach((popover) => popover.close());
  }

  registerPopover(popover: NgbPopover) {
    this.popovers.push(popover);
  }
}
