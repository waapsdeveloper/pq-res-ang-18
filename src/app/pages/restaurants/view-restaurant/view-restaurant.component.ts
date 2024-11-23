import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { GlobalRestaurantService } from 'src/app/services/global-restaurant.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrl: './view-restaurant.component.scss'
})
export class ViewRestaurantComponent {

  restaurantId;
  restaurant;

  constructor(private nav: NavService, private network: NetworkService, public router: Router, public activatedRoute: ActivatedRoute, public grest: GlobalRestaurantService){
    this.initialize();
  }

  async initialize(){

    const rew = await this.activatedRoute.snapshot.params;
    this.restaurantId = rew['id'];

    const res = await this.network.getRestaurantById(this.restaurantId);
    console.log(res);
    this.restaurant = res.restaurant;
    this.grest.restaurant = res.restaurant;


  }

  switchTo(link){

    switch(link){

      case 'overview':
        this.nav.push('pages/restaurants/view/' + this.restaurantId + '/overview')
        break;
      case 'menu':
        this.nav.push('pages/restaurants/view/' + this.restaurantId + '/menu')
        break;



    }

  }




}
