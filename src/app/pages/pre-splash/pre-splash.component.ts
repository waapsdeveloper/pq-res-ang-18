import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-pre-splash',
  templateUrl: './pre-splash.component.html',
  styleUrl: './pre-splash.component.scss'
})
export class PreSplashComponent {
  loading = false;

  constructor(
    private nav: NavService,
    private network: NetworkService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    this.loading = true;
    const defaults = await this.network.getDefaultRestaurantId();
    console.log(defaults);
    if (defaults && defaults.active_restaurant) {
      let R = defaults.active_restaurant;
      localStorage.setItem('restaurant', JSON.stringify(R));
      localStorage.setItem('restaurant_id', R.id);
      localStorage.setItem('restaurant_currency', R.currency);

      setTimeout(() => {
        this.loading = false;
        this.nav.push('/pages/dashboard');
      }, 3000);
    }
  }
}
