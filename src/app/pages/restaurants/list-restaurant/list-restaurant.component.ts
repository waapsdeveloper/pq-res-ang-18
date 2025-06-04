import { ChangeDetectorRef, Component, Injector, ViewEncapsulation } from '@angular/core';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { NavService } from 'src/app/services/basic/nav.service';
import { GlobalRestaurantService } from 'src/app/services/global-restaurant.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { RestaurantService } from '../restaurant.service';
import { EventsService } from 'src/app/services/events.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrl: './list-restaurant.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListRestaurantComponent extends ListBlade {
  showDeleteAllButton = false;
  setDefaultButton;
  configButton;
  canEdit;
  canDelete;
  title = 'Branches';
  addurl = '/pages/restaurants/add';
  override selectAll: boolean = false;

  columns: any[] = ['Name', 'Address', 'Status'];

  override model = {
    name: '',
    address: '',
    status: 'active'
  };

  resetFilters() {
    this.model = {
      name: '',
      address: '',
      status: 'active'
    };
  }
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
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
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
    private cdr: ChangeDetectorRef,
    public currencyService: CurrencyService,
    public events: EventsService,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {
    super(injector, crudService);
    this.initialize();
    this.canDelete = this.permissionService.hasPermission('branch' + '.delete');
    this.configButton = this.permissionService.hasPermission('branch' + '.set_default');
    this.setDefaultButton = this.permissionService.hasPermission('branch' + '.config_button');
  }
  async onDeleteAll($event: any) {
    const flag = await this.utility.presentConfirm('Delete', 'Cancel', 'Delete All Record', 'Are you sure you want to delete all?');

    if (!flag) {
      return;
    }

    this.deleteAll($event);
    this.showDeleteAllButton = false;
    this.events.publish('uncheck-select-all', {
      selectAll: false
    });
    this.cdr.detectChanges();
  }

  initialize() {
    this.crudService.getList('', 1);
  }

  editRow(index: number) {}

  async deleteRow(index: number) {
    if (!this.canDelete) {
      alert('You do not have permission to delete.');
      return;
    }

    let item = this.crudService.list[index];
    let a = parseInt(item.is_active, 10);
    console.log('Deleting item:', item, a);
    if( a === 1 ) {
      this.utility.presentFailureToast('You cannot delete an active restaurant.');
      return;
    }

    try {
      await this.crudService.deleteRow(index, this.utility);
      this.utility.presentSuccessToast('Deleted Sucessfully!');
      console.log('Row deleted successfully');
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }

  async configRow(i) {
    const item = this.crudService.list[i];
    console.log('Configuring item:', item);

    // call network to get branch config
    const res = await this.network.getBranchConfigById(item.id);
    console.log('Branch Config Response:', res);
    if (!res || !res.data) {
      this.utility.presentFailureToast('Branch configuration not found for this restaurant.');
      return; // Exit if branch config is not found
    }

    let config = res.data;

    // Proceed with configuration if id is not null
    this.nav.push('/pages/branch-config/edit/' + config.id);
  }

  openDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/restaurants/view/' + item.id);
  }

  editOpenDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/restaurants/edit/' + item.id);
  }

  async setDefault(i) {
    const confirmed = await this.utility.presentConfirm(
      'Set Default',
      'Cancel',
      'Default Restaurant',
      'Are you sure you want to switch restaurant?'
    );

    if (!confirmed) {
      return; // User clicked "Cancel"
    }

    const item = this.crudService.list[i];
    this.grService.setRestaurant(item.id, item.name);

    // Call API to set default restaurant
    const data = {
      is_active: 1
    };

    const res = await this.network.setActiveRestaurant(data, item.id);
    console.log(res);
    const R = res.restaurant;
    localStorage.setItem('restaurant', JSON.stringify(R));
    localStorage.setItem('restaurant_id', R.id);
    this.currencyService.setCurrency(R.currency);
    this.currencyService.setTax(R.tax);
    this.utility.presentSuccessToast('Default Restaurant Set Successfully!');
    this.crudService.getList('', 1);
  }
  default() {
    this.utility.presentSuccessToast('Already Selected As Default Restaurant!');
  }
}
