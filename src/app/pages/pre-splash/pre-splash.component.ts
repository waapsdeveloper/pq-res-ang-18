import { CurrencyService } from 'src/app/services/currency.service';
import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { PmenuService } from 'src/app/services/pmenu.service';

@Component({
  selector: 'app-pre-splash',
  templateUrl: './pre-splash.component.html',
  styleUrl: './pre-splash.component.scss'
})
export class PreSplashComponent {
  loading = false;

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private currency: CurrencyService,
    private globalData: GlobalDataService,
    private pmenuService: PmenuService,
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {

    this.loading = true;
    this.globalData.getDefaultRestaurant();    
    await this.pmenuService.setDynamicMenu();

    setTimeout(() => {
      this.loading = false;
      this.nav.push('/pages/dashboard');
    }, 3000);
  }
}
