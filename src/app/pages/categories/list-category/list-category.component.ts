import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {

  title = 'Categories';
  addurl = '/pages/categories/add'
  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  perpage = 10;
  list: any[] = [];
  showEdit: boolean = false;
  filters = false;

  columns: any[] = [
    'Name',
    'parent category',
    'Description',
    'photo',
    'menu',
    'Status'

  ]
  form = new FormGroup({});
  model = {
    name: 'Restaurant one',
    parent_category: "",
    description: '',
    photo: '',
    menu: '',
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
            label: 'Name',
            placeholder: 'Enter restaurant name',
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'parent_category',
          type: 'input',
          props: {
            label: 'Parent Category',
            placeholder: 'Enter parent category',
            required: false
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter description',
            required: true,
            rows: 3,
            maxLength: 500 // Optional: Limits the character count
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

    const res = await this.network.getCategories(obj);
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

    // add confirmation




    if (item) {
      await this.network.removeCategory(item.id);
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
    this.nav.push('/pages/categories/view/' + item.id);
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
