import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.scss'
})
export class ListOrdersComponent {
  title = 'Orders';
  addurl = '/pages/orders/add';
  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 10;
  list: any[] = [];
  showEdit: boolean = false;
  filters = false;
  columns: any[] = ['Order Id','Customer Name','Phone No',  'Total Price', 'Table No', "Type", 'Status' ];

  form = new FormGroup({});
  model = {
    order_id:'',
  Customer_name:'',
   phone:'',
   total_price:'',
   table:'',
   type:'',
   status:'',

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
            placeholder: 'Enter Order Id',
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
    private network: NetworkService,
    private users: UsersService
  ) {
    this.initialize();
  }

  initialize() {
    this.getList('', 1);

    const u = this.users.getUser();
    if (u.role_id == 1 || u.role_id == 2) {
      this.showEdit = true;
    }
  }

  async getList(search = '', page = 1): Promise<any> {
    let obj = {
      search: search,
      page: page,
      perpage: this.perpage
    };

    const res = await this.network.getOrders(obj);
    if (res.data) {
      let d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;

//      if (this.page == 1) {
        this.list = d.data;
console.log(this.list);
        // } else {
      //   this.list = [...this.list, ...d.data];
      // }
    }

    return res;
  }

  editRow(index: number) {}

  async deleteRow(index: number) {
    let item = this.list[index];
    if (item) {
      await this.network.removeTable(item.id);
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
    this.nav.push('/pages/orders/view/' + item.id);
  }

  onChangePerPage($event) {
    this.getList('', 1);
  }
  getOrderStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'ready':
        return 'ready';
      case 'in progress':
        return 'in-progress';
      case 'completed':
        return 'completed';
      default:
        return '';
    }
  }
  
  viewDetails(order: any): void {
    console.log('Viewing details for:', order);
  }
  
  payBill(order: any): void {
    console.log('Paying bill for:', order);
  }
  
}
