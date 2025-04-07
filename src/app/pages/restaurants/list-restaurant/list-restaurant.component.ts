import { Component, Injector, ViewEncapsulation } from '@angular/core';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { NavService } from 'src/app/services/basic/nav.service';
import { GlobalRestaurantService } from 'src/app/services/global-restaurant.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrl: './list-restaurant.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class ListRestaurantComponent extends ListBlade {
  title = 'Branches';
  addurl = '/pages/restaurants/add';
  override selectAll: boolean = false;

  columns: any[] = ['Name', 'Address', 'Status'];

  override model = {
    name: '',
    address: '',
    status: 'active'
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
            placeholder: ''
          },
          className: 'col-md-2 col-12' // 3 columns on md+, full width on small screens
        },

        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address',
            placeholder: ''
          },
          className: 'col-md-2 col-12'
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
          className: 'col-md-2 col-12'
        }
      ]
    }
  ];

  constructor(
    injector: Injector,
    public override crudService: RestaurantService,
    public grService: GlobalRestaurantService,
    private nav: NavService,
    private utility: UtilityService,
    private network: NetworkService,
  ) {
    super(injector, crudService);
    this.initialize();
  }

  initialize() {
    this.crudService.getList('', 1);
  }

  editRow(index: number) {}

  async deleteRow(index: number) {
    try {
      const item = this.crudService.list[index];

      // Check if the item id is null
      if (item.id === 1 || item.id === undefined) {
        console.log('Item cannot be deleted because id is null or undefined.');
        return; // Exit the function without attempting to delete
      }

      // Proceed with deletion if id is not null
      await this.crudService.deleteRow(index, this.utility);
      this.utility.presentSuccessToast('Deleted Sucessfully!');

      console.log('Row deleted successfully');
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }

  openDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/restaurants/view/' + item.id);
  }

  editOpenDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/restaurants/edit/' + item.id);
  }

  setDefault(i) {
    let item = this.crudService.list[i];
    this.grService.setRestaurant(item.id, item.name);



    // call api to set default restaurnat
    let data = {
      is_active: 1
    }
    this.network.setActiveRestaurant(data, item.id)

  }
}
