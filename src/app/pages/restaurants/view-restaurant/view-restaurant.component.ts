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
  itemId;
  item;

  constructor(
    private nav: NavService,
    private network: NetworkService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.initialize();
  }

  async initialize() {
    const rew = await this.activatedRoute.snapshot.params;

    this.itemId = rew['id'];

    const res = await this.network.getRestaurantById(this.itemId);
    console.log(res);
    this.item = res.restaurant;
  }

  getDayName(index: number): string {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[index] || 'Day';
  }
}
