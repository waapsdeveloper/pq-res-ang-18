import { Component, Injector } from '@angular/core';
import { RtableService } from '../rtable.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-rtables',
  templateUrl: './list-rtables.component.html',
  styleUrl: './list-rtables.component.scss'
})
export class ListRtablesComponent extends ListBlade {
  columns: any[] = [
    'Table No',
    'No of Orders',
    'Status',
  ];
  title = 'Tables';
  showEdit = false;
  addurl = '/pages/tables/add'
  override model = {
    tableNo: '',
    status: 'active',
    noOfOrders: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'Table No',
          type: 'input',
          props: {
            label: 'Table no',
            placeholder: 'Enter Table no',
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
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
          key: 'Orders',
          type: 'input',
          props: {
            label: 'Orders',
            placeholder: 'Enter Orders',
            required: true
          },
          className: 'col-md-4 col-12'
        },

      ],
    },
  ];


  constructor(
    injector: Injector,
    public crudService: RtableService,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService
  ) {
    super(injector)
    this.initialize();
  }

  initialize() {
    this.crudService.getList('', 1);
    const u = this.users.getUser()
    if (u.role_id == 1 || u.role_id == 2) {
      this.showEdit = true;
    }
  }


  editRow(index: number) {

  }

  async deleteRow(index: number) {
    try {
      await this.crudService.deleteRow(index, this.utility);
      console.log('Row deleted successfully');
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }


  openDetails(i) {
    let item = this.list[i];
    this.nav.push('/pages/rtables/view/' + item.id);
  }

  changePerPage(event: any) {
    this.crudService.onChangePerPage(event.target.value);
  }

  changePage(event: any) {
    this.crudService.pageChange(event);
  }

  toggleFilters() {
    this.crudService.onFilter(!this.crudService.filters);
  }

  submitFilters(model: any) {
    this.crudService.onSubmit(model);
  }

  loadMoreData() {
    this.crudService.loadMore();
  }


}
