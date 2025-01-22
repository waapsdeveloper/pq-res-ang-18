import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.scss'
})
export class ViewOrdersComponent {
  itemId;
  item;
  variations;

  constructor(
    private nav: NavService,
    private network: NetworkService,
    public activatedRoute: ActivatedRoute
  ) {
    this.initialize();
  }

  async initialize() {
    const rew = await this.activatedRoute.snapshot.params;
    this.itemId = rew['id'];
    const res = await this.network.getOrdersById(this.itemId);
    console.log(res);

    this.item = res.order;
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
    products.forEach((product) => {
      if (product.meta_value) {
        product.meta_value = JSON.parse(product.meta_value);
      }
    });

    this.variations = products.flatMap((product) => (Array.isArray(product.meta_value) ? product.meta_value : [])); // Flatten meta_value arrays
    this.item['variation'] = products.flatMap((product) => (Array.isArray(product.meta_value) ? product.meta_value : [])); // Flatten meta_value arrays

    console.log('Parsed products:', this.item);
  }
}
