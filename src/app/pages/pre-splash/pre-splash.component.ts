import { CurrencyService } from 'src/app/services/currency.service';
import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { PmenuService } from 'src/app/services/pmenu.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-pre-splash',
  templateUrl: './pre-splash.component.html',
  styleUrl: './pre-splash.component.scss'
})
export class PreSplashComponent {
  loading = false;
  dashboardPath: boolean;
  routepath;

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private currency: CurrencyService,
    private globalData: GlobalDataService,
    private permissionService: PermissionService,
    private pmenuService: PmenuService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    this.loading = true;
    await this.globalData.getDefaultRestaurant();
    await this.pmenuService.setDynamicMenu();

    console.log('Dynamic menu set:', this.pmenuService);
    this.dashboardPath = this.permissionService.hasPermission('dashboard' + '.view');
    console.log('Dashboard path exists:', this.dashboardPath);

    // setTimeout(() => {
      this.loading = false;
      if (this.dashboardPath) {
        this.routepath = 'pages/dashboard';
      } else {
        this.routepath = this.pmenuService.pmenuItems[0].submenu[0].path;
      }

      console.log('Route path:', this.routepath);
      this.nav.push(this.routepath);
    // }, 3000);
  }
}
