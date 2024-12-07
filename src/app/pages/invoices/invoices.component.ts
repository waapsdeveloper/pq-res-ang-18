import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent { 
  itemId;
  item;

  constructor(private nav: NavService, private network: NetworkService, public activatedRoute: ActivatedRoute) {
    this.initialize();
  }

  async initialize() {
    const rew = await this.activatedRoute.snapshot.params;
    this.itemId = rew['id'];
    const res = await this.network.getOrdersById(this.itemId);
    console.log(res);
    

    this.item = res.order;
    


}}
