import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrl: './recent-order.component.scss'
})
export class RecentOrderComponent {
  title = 'Orders';
  addurl = '/pages/orders/add';
  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 10;
  list: any[] = [];
  showEdit: boolean = false;

  columns: any[] = ['Order Id', 'Customer Name', 'Phone Number', 'Total Price', 'Table Number', 'Customer Type', 'Order Status'];

  customers = [
    {
      name: 'John Doe',
      phone: '(555) 123-4567',
      address: '123 Elm St, Springfield, IL 62701',
      type: 'Regular',
      status: 'Active',
      amount: 150.75,
      actions: ['Edit', 'Delete']
    },
    {
      name: 'Jane Smith',
      phone: '(555) 234-5678',
      address: '456 Oak St, Chicago, IL 60601',
      type: 'VIP',
      status: 'Active',
      amount: 250.50,
      actions: ['Edit', 'Delete']
    },
    {
      name: 'Mark Johnson',
      phone: '(555) 345-6789',
      address: '789 Pine St, Naperville, IL 60540',
      type: 'Regular',
      status: 'Inactive',
      amount: 75.30,
      actions: ['Edit', 'Delete']
    },
    {
      name: 'Sarah Williams',
      phone: '(555) 456-7890',
      address: '101 Maple Ave, Peoria, IL 61602',
      type: 'Regular',
      status: 'Active',
      amount: 120.45,
      actions: ['Edit', 'Delete']
    },
    {
      name: 'David Brown',
      phone: '(555) 567-8901',
      address: '202 Birch Rd, Bloomington, IL 61701',
      type: 'VIP',
      status: 'Active',
      amount: 350.60,
      actions: ['Edit', 'Delete']
    },
    {
      name: 'Emily Davis',
      phone: '(555) 678-9012',
      address: '303 Cedar Ln, Decatur, IL 62521',
      type: 'Regular',
      status: 'Inactive',
      amount: 65.10,
      actions: ['Edit', 'Delete']
    },
    {
      name: 'Michael Wilson',
      phone: '(555) 789-0123',
      address: '404 Fir St, Champaign, IL 61820',
      type: 'VIP',
      status: 'Active',
      amount: 220.90,
      actions: ['Edit', 'Delete']
    },
    {
      name: 'Jessica Martinez',
      phone: '(555) 890-1234',
      address: '505 Willow Ave, Rockford, IL 61107',
      type: 'Regular',
      status: 'Active',
      amount: 95.40,
      actions: ['Edit', 'Delete']
    },
    {
      name: 'Chris Taylor',
      phone: '(555) 901-2345',
      address: '606 Redwood Blvd, Joliet, IL 60432',
      type: 'VIP',
      status: 'Active',
      amount: 500.80,
      actions: ['Edit', 'Delete']
    },
    {
      name: 'Ashley Anderson',
      phone: '(555) 012-3456',
      address: '707 Pinehurst Ln, Aurora, IL 60506',
      type: 'Regular',
      status: 'Inactive',
      amount: 110.25,
      actions: ['Edit', 'Delete']
    }
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
