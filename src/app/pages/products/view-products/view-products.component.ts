import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {
  itemId;
  item;

  constructor(private nav: NavService, private network: NetworkService, public activatedRoute: ActivatedRoute) {
    this.initialize();
  }

  async initialize() {
    console.log("yayay");

    const rew = await this.activatedRoute.snapshot.params;


    this.itemId = rew['id'];


    const res = await this.network.getProductsById(this.itemId);
    this.item = res.product
    


  }
}
