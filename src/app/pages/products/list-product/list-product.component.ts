import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent {

  title = 'Products';
  addurl = '/pages/products/add'
  search = '';
  filters = false;
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 10;
  list: any[] = [];
  showEdit: boolean = false;
  form = new FormGroup({});
  model = {
    name: '',
    category: '',
    price: '',
    discount: '',
    status: 'active',
    type: '',
    noOfOrders: '',
    photo: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Name',
            placeholder: 'Enter name',
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'category',
          type: 'input',
          props: {
            label: 'Category',
            placeholder: 'Enter category',
            required: true
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'price',
          type: 'input',
          props: {
            label: 'Price',
            placeholder: 'Enter price',
            required: true,
            type: 'number',
            min: 0
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'discount',
          type: 'input',
          props: {
            label: 'Discount',
            placeholder: 'Enter discount',
            type: 'number',
            min: 0
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' }
            ],
            required: true
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'type',
          type: 'input',
          props: {
            label: 'Type',
            placeholder: 'Enter type',
            required: true
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'noOfOrders',
          type: 'input',
          props: {
            label: 'Number of Orders',
            placeholder: 'Enter number of orders',
            type: 'number',
            min: 0
          },
          className: 'col-md-4 col-12'
        },

      ],
    },
  ];

  columns: any[] = [
    'Name',
    'Category',
    'Price',
    'Type',
    'No of Orders',
    'Discount',
    'Status',

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

    const u = this.users.getUser()
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

    const res = await this.network.getProducts(obj);
    if (res.data) {

      let d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;

      //      if(this.page == 1){
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
      await this.network.removeProduct(item.id);
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
    this.nav.push('/pages/products/view/' + item.id);
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

}
