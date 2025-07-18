import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from 'src/app/services/utility.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.scss'
})
export class ViewOrdersComponent implements OnInit {
  itemId;
  currency = 'USD';
  currencySymbol = '$';
  item;
  variations;
  selectedStatus = '';
  statuses = ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'completed', 'cancelled'];

  constructor(
    private nav: NavService,
    private globalData: GlobalDataService,
    private network: NetworkService,
    public activatedRoute: ActivatedRoute,
    public utility: UtilityService,
    public currencyService: CurrencyService
  ) {
    this.initialize();
    this.globalData.getCurrency().subscribe((currency) => {
      this.currency = currency;
      console.log('Currency updated:', this.currency);
    });

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.initialize();
    });
  }

  async initialize() {
    const rew = await this.activatedRoute.snapshot.params;
    this.itemId = rew['id'];
    const res = await this.network.getOrdersById(this.itemId);
    console.log(res);

    this.item = res.order;
    this.item['selectedStatus'] = this.item.status.toLowerCase();
    this.selectedStatus = this.item.status.toLowerCase();

    this.variations = this.item?.products;
    this.parseMetaValues(this.variations);
  }
  popovers: NgbPopover[] = [];
  closeAllPopovers() {
    this.popovers.forEach((popover) => popover.close());
  }

  registerPopover(popover: NgbPopover) {
    this.popovers.push(popover);
  }
  parseMetaValues(products: any[]) {
    console.log('meta_value', products);
    products.forEach((product) => {
      if (product.variation) {
        product.variation = JSON.parse(product.variation);
      }
      console.log('variation', product.variation);
    });

    this.variations = products.flatMap((product) => (Array.isArray(product.meta_value) ? product.meta_value : [])); // Flatten meta_value arrays
    this.item['variation'] = products.flatMap((product) => (Array.isArray(product.meta_value) ? product.meta_value : [])); // Flatten meta_value arrays

    console.log('Parsed products:', this.item);
  }

  async updateStatus(item: any, newStatus: string) {
    // Receive newStatus
    let obj = {
      status: newStatus // Use newStatus
    };
    console.log(obj);

    try {
      await this.network.orderStatus(item.id, obj);
      this.utility.presentSuccessToast(`Order Status Updated to ${obj.status}`);
      item.status = newStatus; // Update the item's status locally
    } catch (error) {
      console.error('Error updating status:', error);
      this.utility.presentFailureToast('Failed to update order status.');
    }
  }

  onStatusChange(event) {
    console.log(event);
    this.item.selectedStatus = event;
    console.log('change', this.selectedStatus);
  }

  openStatusDropdown(item: any) {
    const options = this.statuses.map((status) => ({ value: status, label: this.titleCase(status) }));

    this.utility.showCustomDropdown(
      'Update Order Status',
      'status-dropdown',
      options,
      item.status,
      'Update Status',
      (newStatus: string) => {
        this.updateStatus(item, newStatus); // Pass both item and newStatus
      }
    );
  }

  titleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
}
