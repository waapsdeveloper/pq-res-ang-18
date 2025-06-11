import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { NavService } from 'src/app/services/basic/nav.service';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';
import { RtableService } from '../../rtables/rtable.service';
import { RoleService } from '../role.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrl: './list-roles.component.scss',
  standalone: false
})
export class ListRolesComponent extends ListBlade {
  showDeleteAllButton = false;
  canDelete;
  canView;
  canEdit;

  columns: any[] = ['Name', 'Slugs'];
  title = 'Roles';
  showEdit = false;
  addurl = '/pages/roles/add';
  override model = {
    name: '',
    slugs: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Role Name',
            placeholder: 'Enter role name',
            required: true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'slugs',
          type: 'input',
          props: {
            label: 'Slugs',
            placeholder: 'Enter slugs (comma separated)',
            required: true
          },
          className: 'col-md-6 col-12'
        }
      ]
    }
  ];
  ngOnInit(): void {
    this.setRestaurantsInForm();
  }
  constructor(
    injector: Injector,
    public override crudService: RoleService,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {
    super(injector, crudService);
    this.initialize();
    this.canDelete = this.permissionService.hasPermission('role' + '.delete');
    this.canView = this.permissionService.hasPermission('role' + '.view');
    this.canEdit = this.permissionService.hasPermission('role' + '.edit');
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
    const u = this.users.getUser();
    if (u.role_id == 1 || u.role_id == 2) {
      this.showEdit = true;
    }
  }
  async getRestaurants(): Promise<any[]> {
    let obj = {
      search: '',
      perpage: 500,

      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
    };
    const res = await this.network.getRestaurants(obj);

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
  async setRestaurantsInForm() {
    const res = await this.getRestaurants();
    console.log(res);

    for (var i = 0; i < this.fields.length; i++) {
      for (var j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key == 'restaurant_id') {
          fl.props.options = res;
        }
      }
    }
  }

  editRow(index: number) {}

  async deleteRow(index: number) {
    if (!this.canDelete) {
      alert('You do not have permission to delete.');
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

  openDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/roles/view/' + item.id);
  }
  openEditDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/roles/edit/' + item.id);
  }
  resetFilters() {
    this.form.reset(); // Reset form controls
    this.model = {
      name: '',
      slugs: ''
    }; // Clear the model (or set to default values if needed)
    this.form.patchValue(this.model);
    this.debouncedSubmitFilters(this.model); // Optionally re-apply the filter logic
  }
}
