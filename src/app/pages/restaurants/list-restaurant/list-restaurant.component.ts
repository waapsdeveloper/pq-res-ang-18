import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrl: './list-restaurant.component.scss'
})
export class ListRestaurantComponent {
  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  list: any[] = [];

  columns: any[] = [
    'id',

  ]

  constructor(
    private nav: NavService,
    private network: NetworkService
  ) {
    this.initialize();
  }

  initialize() {
    this.getList('', 1);
  }

  async getList(search = '', page = 1): Promise<any> {
    let obj = {
      search: search,
      page: page
    };

    const res = await this.network.getRestaurants(obj);
    if(res.data){

      let d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;

      if(this.page == 1){
        this.list = d.data;
      } else {
        this.list = [...this.list, ...d.data];
      }

    }

    return res;
  }

  editRow(index: number) {

  }

  deleteRow(index: number) {

  }

  loadMore() {
    // this.visibleRows += 5; // Load 5 more rows
  }

  openDetails(id) {
    this.nav.push('/pages/restaurants/view/' + id);
  }
}
