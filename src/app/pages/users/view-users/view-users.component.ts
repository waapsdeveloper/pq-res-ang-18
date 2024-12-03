import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss'
})
export class ViewUsersComponent {
  itemId;
  item;

  constructor(private nav: NavService, private network: NetworkService, public router: Router, public activatedRoute: ActivatedRoute){
    this.initialize();
  }

  async initialize(){

    const rew = await this.activatedRoute.snapshot.params;
    this.itemId = rew['id'];

    const res = await this.network.getRestaurantById(this.itemId);
    console.log(res);
    this.item = res.restaurant;



  }

}
