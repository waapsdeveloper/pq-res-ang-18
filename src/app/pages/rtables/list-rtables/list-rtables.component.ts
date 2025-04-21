import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { RtableService } from '../rtable.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { UtilityService } from 'src/app/services/utility.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-list-rtables',
  templateUrl: './list-rtables.component.html',
  styleUrl: './list-rtables.component.scss'
})
export class ListRtablesComponent extends ListBlade {
  showDeleteAllButton = false;
  columns: any[] = ['Table No', 'No of seats', 'Floor', 'No of Orders', 'Status'];
  title = 'Tables';
  showEdit = false;
  addurl = '/pages/tables/add';
  override model = {
    tableNo: '',
    status: '',
    noOfOrders: '',
    no_of_seats: '',
    floor: '',
    location: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'no_of_seats',
          type: 'input',
          props: {
            label: 'Number of Seats',
            placeholder: 'Enter number of seats',
            required: true,
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-3 col-12'
        },
        {
          key: 'floor',
          type: 'select',
          props: {
            label: 'Floor',
            placeholder: 'Select floor',
            required: true,
            options: [
              { label: 'First Floor', value: 'First' },
              { label: 'Second Floor', value: 'Second' },
              { label: 'Third Floor', value: 'Third' },
              { label: 'Fourth Floor', value: 'Fourth' },
              { label: 'Fifth Floor', value: 'Fifth' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-3 col-12'
        },
        {
          key: 'tableNo',

          type: 'input',
          props: {
            label: 'Table no',
            placeholder: 'Enter Table no',

            minLength: 3
          },
          className: 'col-md-3 col-12' // 3 columns on md+, full width on small screens
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-3 col-12'
        }
      ]
    }
  ];
  ngOnInit(): void {
    this.setRestaurantsInForm();
  }
  constructor(
    injector: Injector,
    public override crudService: RtableService,
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
    this.nav.push('/pages/tables/view/' + item.id);
  }
  openEditDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/tables/edit/' + item.id);
  }
}
