import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-favourite-table',
  templateUrl: './favourite-table.component.html',
  styleUrl: './favourite-table.component.scss',
  standalone: false
})
export class FavouriteTableComponent implements OnInit {
  tables: any[] = [];
  currency = 'USD';
  currencySymbol = '$';
  constructor(
    private network: NetworkService,
    public currencyService: CurrencyService,
    private globalData: GlobalDataService
  ) {
    this.globalData.getCurrency().subscribe((currency) => {
      this.currency = currency;
      console.log('Currency updated:', this.currency);
    });

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
  }
  async ngOnInit() {
    const data = await this.network.getLatestTable();

    const d = data.tables;
    console.log(d, 'favourite table data');
    if (d && typeof d === 'object') {
      this.tables = Object.values(d).map((table: any) => ({
        name: table.name,
        floor: table.floor,
        total_orders: table.total_orders,
        total_amount: table.total_amount
      }));
    }
    console.log(this.tables);
  }
  getProgressBarBackground(status: string) {
    if (status === 'active') {
      return 'lightgreen'; // Light green for active
    } else if (status === 'inactive') {
      return 'lightgray'; // Light gray for inactive
    } else if (status === 'busy') {
      return 'lightcoral'; // Light red for busy
    }
    return 'lightgray'; // Default case
  }
  getProgressBarColor(status: string) {
    if (status === 'active') {
      return 'green'; // Green for active
    } else if (status === 'inactive') {
      return 'gray'; // Gray for inactive
    } else if (status === 'busy') {
      return 'red'; // Red for busy
    }
    return 'gray'; // Default case
  }
}
