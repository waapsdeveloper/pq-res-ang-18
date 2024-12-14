import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {

  title = 'Users';
  addurl = '/pages/users/add'
  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 10;
  list: any[] = [];
  filters = false;

  columns: any[] = [
    'Name',
    'phone',
    'address',
    'orders',
    'Status',
    'Photo'
  ]
  form = new FormGroup({});
  model = {
    name: '',
    phone: '',
    address: '',
    order: '',
    status: 'active',
    photo: '',
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
            placeholder: 'Enter restaurant name',
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
        },

        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address',
            placeholder: 'Enter address',
            required: true
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
      perpage: this.perpage
    };

    const res = await this.network.getUsers(obj);
    if (res.data) {

      let d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;

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
      await this.network.removeUser(item.id);
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
    this.nav.push('/pages/users/view/' + item.id);
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

  getRandomNumberBetween50And100(): number {
    const min = 50;
    const max = 100;
    return Math.round(Math.random() * (max - min) + min); // Generates a random number between 50 and 100
  }

}
