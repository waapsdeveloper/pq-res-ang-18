import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { UserService } from '../user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent extends ListBlade {
  showDeleteAllButton = false;
  title = 'Users';
  addurl = '/pages/users/add';

  columns: any[] = ['Full Name', 'Email', 'Phone', 'Total Orders', 'Address', 'Role', 'Status'];

  actions: any[] = [
    {
      name: 'Edit',
      icon: 'edit',
      action: 'editRow'
    },
    {
      name: 'Delete',
      icon: 'delete',
      action: 'deleteRow'
    },
    {
      name: 'View',
      icon: 'visibility',
      action: 'openDetails'
    },
    //block
    {
      name: 'Block',
      icon: 'block',
      action: 'blockUser'
    },
    //statistics
    {
      name: 'Statistics',
      icon: 'bar_chart',
      action: 'viewStatistics'
    }
  ];

  override model = {
    name: '',
    email: '',
    phone: '',
    role_id: '',
    status: null
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
            placeholder: 'Enter Name'
          },
          className: 'col-md-2 col-12' // 3 columns on md+, full width on small screens
        },
        {
          key: 'email',
          type: 'input',
          props: {
            label: 'Email',
            placeholder: ''
          },
          className: 'col-md-2 col-12' // 3 columns on md+, full width on small screens
        },
        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone Number',
            placeholder: 'Enter phone ',

            type: 'tel'
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'role_id',
          type: 'select',
          props: {
            label: 'Role',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
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

  roles: any[] = [];

  constructor(
    injector: Injector,
    public override crudService: UserService,
    private nav: NavService,
    private utility: UtilityService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService
  ) {
    super(injector, crudService);
    this.initialize();
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

  async initialize() {
    this.crudService.getList('', 1);
    const res = await this.crudService.getRoles();
    console.log('Roles:', res);
    this.roles = res.data.data;

    this.fields[0].fieldGroup[3].props.options = this.roles.map((role) => {
      return { value: role.id, label: role.name };
    });
  }
  async delete($event: any) {
    const flag = await this.utility.presentConfirm('Delete', 'Cancel', 'Delete All Record', 'Are you sure you want to delete all?');

    if (!flag) {
      return;
    }

    this.deleteAll($event);
  }
  async setRoleInForm() {
    const res = await this.getRoles();
    console.log(res);

    for (var i = 0; i < this.fields.length; i++) {
      for (var j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key == 'role') {
          fl.props.options = res;
        }
      }
    }
  }

  // get roles array
  async getRoles(): Promise<any[]> {
    let obj = {
      search: ''
    };
    const res = await this.network.getRoles(obj);

    if (res && res['data']) {
      let d = res['data'];
      let dm = d['data'];
      return dm.map((r) => {
        return {
          value: r.id,
          label: r.name
        };
      }) as any[];
    }

    return [];
  }

  editRow(index: number) {}

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
    this.nav.push('/pages/users/view/' + item.id);
  }
  openEditDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/users/edit/' + item.id);
    console.log(item.image);
  }

  getRandomNumberBetween50And100(): number {
    const min = 50;
    const max = 100;
    return Math.round(Math.random() * (max - min) + min); // Generates a random number between 50 and 100
  }
}
