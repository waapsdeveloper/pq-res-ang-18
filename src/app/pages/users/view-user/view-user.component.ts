import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';


import { async } from 'rxjs';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
  itemId;
  item;



  constructor(private nav: NavService, private network: NetworkService, public router: Router, public activatedRoute: ActivatedRoute) {
    this.initialize();
  }



  async initialize() {
    console.log("agbdsb");

    const rew = await this.activatedRoute.snapshot.params;


    this.itemId = rew['id'];

    console.log(this.itemId);
    
    const res = await this.network.getUsersById(this.itemId);
    console.log(res,"4165416516");
    this.item = res.user;


  }



}
