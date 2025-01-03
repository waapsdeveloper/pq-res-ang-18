import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrl: './view-invoices.component.scss'
})
export class ViewInvoicesComponent {
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
    const res = await this.network.getInvoicesById(this.itemId);

    this.item = res.invoice;
    console.log(this.item);
  }
}
