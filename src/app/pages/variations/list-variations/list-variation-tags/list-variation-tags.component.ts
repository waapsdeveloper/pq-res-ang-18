import { Component, Input } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-list-variation-tags',
  templateUrl: './list-variation-tags.component.html',
  styleUrl: './list-variation-tags.component.scss'
})
export class ListVariationTagsComponent {
  currency = 'USD';
  currencySymbol = '$';
  constructor(private globalData: GlobalDataService) {
    this.globalData.getCurrency().subscribe((currency) => {
      this.currency = currency;
      console.log('Currency updated:', this.currency);
    });

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
  }
  list: any[] = [];
  private _metaValues: any;
  @Input()
  get metaValues(): any {
    return this._metaValues;
  }

  set metaValues(value: any) {
    this._metaValues = value;
    this.parseValues(value);
  }

  parseValues(v) {
    console.log(v);
    if (v) {
      const json = JSON.parse(v);
      this.list = json as any[];
    }
  }

  activePopovers: NgbPopover[] = [];

  // Close all open popovers
  closeAllPopovers() {
    this.activePopovers.forEach((popover) => popover.close());
    this.activePopovers = [];
  }

  // Register the active popover
  registerPopover(popover: NgbPopover) {
    this.activePopovers.push(popover);
  }
}
