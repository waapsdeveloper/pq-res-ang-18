import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrl: './list-restaurant.component.scss'
})
export class ListRestaurantComponent {

  title = 'Restaurants';
  addurl = '/pages/restaurants/add'
  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 10;
  list: any[] = [];
  filters = false;

  columns: any[] = [
    'Name',
    'Address',
    'Status'
  ]

  form = new FormGroup({});
  model = {
    name: '',
    address: '',
    status: 'active',
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Restaurant Name',
            placeholder: 'Search name',
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
        },

        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address',
            placeholder: 'Search address',
          },
          className: 'col-md-4 col-12'
        },

        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]
          },
          className: 'col-md-4 col-12'
        },

      ],
    },
  ];

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
      page: page,
      perpage: this.perpage,
      filters: this.filters ? JSON.stringify(this.model) : null
    };

    const res = await this.network.getRestaurants(obj);
    if (res.data) {

      let d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;
      console.log(res);

      // if(this.page == 1){
      this.list = d.data;
      // } else {
      //   this.list = [...this.list, ...d.data];
      // }


    }

    return res;
  }

  editRow(index: number) {

  }

  async deleteRow(index: number) {
    let item = this.list[index];
    if (item) {
      await this.network.removeRestaurant(item.id);
    }
    this.list.splice(index, 1);
  }

  loadMore() {
    if (this.page < this.lastPage) {
      this.getList(this.search, this.page + 1);
    }

  }

  openDetails(i) {
    let item = this.list[i];
    this.nav.push('/pages/restaurants/view/' + item.id);
  }

  onChangePerPage($event) {
    this.getList('', 1);
  }

  pageChange($event) {
    this.getList(this.search, $event);
  }

  onSearch($event) {
    console.log($event);
    this.search = $event;
    this.getList(this.search, 1);
  }

  onFilter($event){
    this.filters = !this.filters;

    if(!this.filters){
      this.search = '';
      this.getList('', 1);
    }

  }

  onSubmit(model){

    this.search = '';
    this.getList('', 1);
  }


}
