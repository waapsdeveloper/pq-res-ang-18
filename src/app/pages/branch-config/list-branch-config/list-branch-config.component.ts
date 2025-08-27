import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { BranchConfigService } from '../branch-config.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-branch-config',
  templateUrl: './list-branch-config.component.html',
  styleUrl: './list-branch-config.component.scss'
})
export class ListBranchConfigComponent extends ListBlade {
  showDeleteAllButton = false;
  columns: any[] = ['Restaurant Name', 'Currency', 'Dial Code', 'Tax'];
  title = 'Branch Configurations';
  showEdit = false;
  override model = {
    restaurant_name: '',
    currency: '',
    dial_code: '',
    tax: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'restaurant_name',
          type: 'input',
          props: {
            label: 'Restaurant Name',
            placeholder: 'Enter restaurant name'
          },
          className: 'col-md-3 col-12'
        },
        {
          key: 'currency',
          type: 'input',
          props: {
            label: 'Currency',
            placeholder: 'Enter currency (e.g. USD)'
          },
          className: 'col-md-3 col-12'
        },
        {
          key: 'dial_code',
          type: 'input',
          props: {
            label: 'Dial Code',
            placeholder: 'Enter dial code (e.g. +1)'
          },
          className: 'col-md-3 col-12'
        },
        {
          key: 'tax',
          type: 'input',
          props: {
            label: 'Tax (%)',
            placeholder: 'Enter tax percentage',
            type: 'number',
            min: 0,
            max: 100
          },
          className: 'col-md-3 col-12'
        }
      ]
    }
  ];

  constructor(
    injector: Injector,
    public override crudService: BranchConfigService,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService
  ) {
    super(injector, crudService);
    this.initialize();
  }

  initialize() {
    this.crudService.getList('', 1);
    const u = this.users.getUser();
    if (u.role_id == 1 || u.role_id == 2) {
      this.showEdit = true;
    }
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
  // Add methods for CRUD operations as needed
  async deleteRow(index: number) {
    try {
      await this.crudService.deleteRow(index, this.utility);
      this.utility.presentSuccessToast('Deleted Sucessfully!');

      console.log('Row deleted successfully');
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }

  openDetails(i) {
    let item = this.crudService.list[i];
    console.log(item);
    this.nav.push('/pages/branch-config/view/' + item.id);
    console.log(item.image);
  }
  openEditDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/branch-config/edit/' + item.id);
  }
  resetFilters() {
    this.form.reset(); // Reset the form controls
    // Optionally reset the model as well
    this.model = {
      restaurant_name: '',
      currency: '',
      dial_code: '',
      tax: ''
    };
    // Re-apply the reset model to the form
    this.form.patchValue(this.model);
    // Optionally, trigger the filter logic if needed
    this.debouncedSubmitFilters(this.model);
    this.crudService.resetFilters(this.model);;
  }
}
