import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NavService } from 'src/app/services/basic/nav.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-variations',
  templateUrl: './view-variations.component.html',
  styleUrl: './view-variations.component.scss'
})
export class ViewVariationsComponent {
  currency = 'USD';
  currencySymbol = '$';
  itemId;
  item;

  constructor(
    private nav: NavService,
    private network: NetworkService,
    public activatedRoute: ActivatedRoute,
    private globalData: GlobalDataService
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

  async initialize() {
    const rew = await this.activatedRoute.snapshot.params;
    this.itemId = rew['id'];
    const res = await this.network.getVariationsById(this.itemId);
    console.log(res);

    this.item = res.variation;
    if (this.item && this.item.meta_value) {
      this.item.meta_value = JSON.parse(this.item.meta_value);
      console.log(this.item.meta_value);
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
