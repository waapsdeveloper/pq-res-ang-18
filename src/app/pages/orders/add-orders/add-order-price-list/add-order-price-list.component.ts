import { Component, OnInit } from '@angular/core';
import { AddOrderService } from '../add-order.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NetworkService } from 'src/app/services/network.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-add-order-price-list',
  templateUrl: './add-order-price-list.component.html',
  styleUrl: './add-order-price-list.component.scss'
})
export class AddOrderPriceListComponent implements OnInit {
  currency = 'USD';
  currencySymbol = '$';
  constructor(
    public orderService: AddOrderService,
    public nav: NavService,
    private network: NetworkService,
    private globalData: GlobalDataService
  ) {
    this.globalData.getCurrency().subscribe((currency) => {
      this.currency = currency;
      console.log('Currency updated:', this.currency);
    });

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
  }
  async ngOnInit() {}

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

  changeVariationSelection($event) {
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
  calculateTotalPrice(item: any): number {
    let totalPrice = parseFloat(item.price); // Start with the base product price

    if (item.variation) {
      // Add the price of selected variations
      item.variation.forEach((variation: any) => {
        if (variation.options) {
          variation.options.forEach((option: any) => {
            if (option.selected) {
              totalPrice += parseFloat(option.price); // Add the price of selected options
            }
          });
        }
      });
    }
    // this.orderService.totalOfProductCost();
    return totalPrice; // Return the total calculated price
  }
}
