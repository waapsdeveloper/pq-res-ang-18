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
  columns: any[] = ['Order Id', 'Customer Name', 'Phone No', 'Total Price', 'Table No', "Type", 'Status'];

  form = new FormGroup({});
  model = {
    order_id: '',
    Customer_name: '',
    phone: '',
    total_price: '',
    table: '',
    type: '',
    status: '',

  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'order_id',
          type: 'input',
          props: {
            label: 'Order ID',
            placeholder: 'Enter order ID',
            required: true,
            pattern: '^[a-zA-Z0-9-_]+$', // Alphanumeric with optional hyphen/underscore
            title: 'Order ID can only contain letters, numbers, hyphens, and underscores'
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'Customer_name',
          type: 'input',
          props: {
            label: 'Customer Name',
            placeholder: 'Enter customer name',
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone',
            placeholder: 'Enter phone number',
            required: true,
            type: 'tel',
            pattern: '\\d{11}',
            title: 'Enter a valid 10-digit phone number'
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'total_price',
          type: 'input',
          props: {
            label: 'Total Price',
            placeholder: 'Enter total price',
            required: true,
            type: 'number',
            min: 0,
            step: 0.01 // For decimal prices
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'table',
          type: 'input',
          props: {
            label: 'Table Number',
            placeholder: 'Enter table number',
            required: false,
            type: 'number',
            min: 0
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'type',
          type: 'select',
          props: {
            label: 'Order Type',
            options: [
              { label: 'Dine-In', value: 'dine-in' },
              { label: 'Takeaway', value: 'takeaway' },
              { label: 'Delivery', value: 'delivery' }
            ],
            required: true
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Order Status',
            options: [
              { label: 'Pending', value: 'pending' },
              { label: 'Completed', value: 'completed' },
              { label: 'Cancelled', value: 'cancelled' }
            ],
            required: true
          },
          className: 'col-md-4 col-12'
        }

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

  editRow(index: number) { }

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
  openEditDetails(i){
    let item = this.list[i];
    this.nav.push('/pages/orders/edit/' + item.id);

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
