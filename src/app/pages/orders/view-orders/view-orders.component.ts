import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.scss'
})
export class ViewOrdersComponent implements OnInit {
  itemId;
  item;
  variations;
  selectedStatus = '';
  statuses = ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'completed', 'cancelled'];

  constructor(
    private nav: NavService,
    private network: NetworkService,
    public activatedRoute: ActivatedRoute,
    public utility: UtilityService
  ) {
    this.initialize();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.initialize();
    })
  }



  async initialize() {
    const rew = await this.activatedRoute.snapshot.params;
    this.itemId = rew['id'];
    const res = await this.network.getOrdersById(this.itemId);
    console.log(res);

    this.item = res.order;

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
    console.log("meta_value",products)
    products.forEach((product) => {
      if (product.variation) {
        product.variation = JSON.parse(JSON.parse(product.variation));

      }
      console.log("variation",product.variation);
    });

    this.variations = products.flatMap((product) => (Array.isArray(product.meta_value) ? product.meta_value : [])); // Flatten meta_value arrays
    this.item['variation'] = products.flatMap((product) => (Array.isArray(product.meta_value) ? product.meta_value : [])); // Flatten meta_value arrays

    console.log('Parsed products:', this.item);
  }
  async updateStatus(item) {

    let obj = {
      status: this.selectedStatus
    };
    console.log(obj);

    await this.network.orderStatus(item.id, obj);

    this.utility.presentSuccessToast(`Order Status Updated to ${obj.status}`);
  }
}
