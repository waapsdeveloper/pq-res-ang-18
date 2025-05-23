import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-variations',
  templateUrl: './view-variations.component.html',
  styleUrl: './view-variations.component.scss'
})
export class ViewVariationsComponent {
  itemId;
  item;

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
