import { Component, Injector } from '@angular/core';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrl: './list-restaurant.component.scss'
})
export class ListRestaurantComponent extends ListBlade {

  title = 'Restaurants';
  addurl = '/pages/restaurants/add'


  columns: any[] = [
    'Name',
    'Address',
    'Status'
  ];

  override model = {
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
            label: 'Name',
            placeholder: '',
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
        },

        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address',
            placeholder: '',
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
    injector: Injector,
    public crudService: RestaurantService,
    private nav: NavService,
    private utility: UtilityService,
  ) {
    super(injector)
    this.initialize();
  }

  initialize() {
    this.crudService.getList('', 1);
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
    let item = this.crudService.list[i];
    this.nav.push('/pages/restaurants/view/' + item.id);
  }

  editDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/restaurants/edit/' + item.id);
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
