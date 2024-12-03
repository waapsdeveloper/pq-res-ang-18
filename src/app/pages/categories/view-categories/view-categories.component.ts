import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.scss'
})
export class ViewCategoriesComponent {
  itemId;
  item;

  //  

  constructor(private nav: NavService, private network: NetworkService, public activatedRoute: ActivatedRoute) {
    this.initialize();
  }

  async initialize() {
    console.log("agbdsb");

    const rew = await this.activatedRoute.snapshot.params;


    this.itemId = rew['id'];

    console.log(this.itemId);
    
    const res = await this.network.getCategoriesById(this.itemId);
    console.log(res,"category");
    this.item = res.category;


  }


}
