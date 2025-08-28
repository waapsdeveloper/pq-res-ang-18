import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { NavService } from 'src/app/services/basic/nav.service';
import { GlobalRestaurantService } from 'src/app/services/global-restaurant.service';
import { UtilityService } from 'src/app/services/utility.service';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { NetworkService } from 'src/app/services/network.service';
import { VariationsService } from '../variations.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-list-variations',
  templateUrl: './list-variations.component.html',
  styleUrl: './list-variations.component.scss'
})
export class ListVariationsComponent extends ListBlade {
  showDeleteAllButton = false;
  title = 'Variations';
  addurl = '/pages/variations/add';
  override selectAll: boolean = false;

  columns: any[] = ['Name', 'Description', 'Options'];

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
    public override crudService: VariationsService,
    public grService: GlobalRestaurantService,
    private nav: NavService,
    private utility: UtilityService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService
  ) {
    super(injector, crudService);
    this.initialize();
  }

  initialize() {
    this.crudService.getList('', 1);
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
    this.nav.push('/pages/variations/view/' + item.id);
  }

  editOpenDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/variations/edit/' + item.id);
  }
}
