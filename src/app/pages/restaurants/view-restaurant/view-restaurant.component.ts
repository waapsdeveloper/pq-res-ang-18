import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrl: './view-restaurant.component.scss'
})
export class ViewRestaurantComponent {

  restaurantId;

  constructor(private nav: NavService, public router: Router, public activatedRoute: ActivatedRoute){
    this.initialize();
  }

  async initialize(){
    const params = await this.nav.getParams();

    const rew = await this.activatedRoute.snapshot.params;
    console.log(params, rew)
    this.restaurantId = rew['id'];


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
