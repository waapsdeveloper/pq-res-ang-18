import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.scss'],
})
export class ListInvoicesComponent {
  title = 'Invoices';
  addurl = '/pages/invoices/add'; // Path to add an invoice
  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 10;
  list: any[] = [];
  showEdit: boolean = false;

  columns: any[] = [
    'Invoice Number',
    'Customer Name',
    'Total Amount',
    'Status',
    'Date',
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
      perpage: this.perpage,
    };

    const res = await this.network.getInvoices(obj); // Adjusted to fetch invoices
    if (res.data) {
      let d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;

      this.list = d.data;
    }

    return res;
  }

  editRow(index: number) {
    const invoice = this.list[index];
    this.nav.push(`/pages/invoices/edit/${invoice.id}`);
  }

  async deleteRow(index: number) {
    let item = this.list[index];
    if (item) {
      await this.network.removeInvoice(item.id); // Adjusted to remove an invoice
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
    this.nav.push(`/pages/invoices/view/${item.id}`);
  }

  onChangePerPage($event) {
    this.getList('', 1);
  }

  pageChange($event) {
    this.getList(this.search, $event);
  }

  onSearch($event) {
    this.search = $event;
    this.getList(this.search, 1);
  }
}
