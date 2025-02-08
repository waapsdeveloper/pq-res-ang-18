import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'rxjs';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-table-booking',
  templateUrl: './view-table-booking.component.html',
  styleUrl: './view-table-booking.component.scss'
})
export class ViewTableBookingComponent {
  itemId;
  item;
  start_date
  start_time
  end_date;
  end_time;

  constructor(
    private nav: NavService,
    private network: NetworkService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.initialize();
  }
  async initialize() {
    console.log('agbdsb');

    const rew = await this.activatedRoute.snapshot.params;

    this.itemId = rew['id'];

    console.log(this.itemId);

    const res = await this.network.getTableBookingById(this.itemId);

    this.item = res.data;
    const [date, time] = this.item.booking_start.split(" ");
    this.start_date = date
    this.start_time=time;
     const [datee,timee] = this.item.booking_end.split(" ");
     this.end_date = datee;
     this.end_time = timee
  }
}
