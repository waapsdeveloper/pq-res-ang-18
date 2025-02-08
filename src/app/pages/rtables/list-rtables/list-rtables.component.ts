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
  columns: any[] = ['Table No','Branch','No of seats','Floor', 'No of Orders', 'Status'];
  title = 'Tables';
  showEdit = false;
  addurl = '/pages/tables/add';
  override model = {
    tableNo: '',
    status: '',
    noOfOrders: '',
    no_of_seats: '',
    floor: '',
    location: '',
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
          type: 'input',
          props: {
            label: 'Floor',
            placeholder: 'Enter floor description',
            required: true,
            maxLength: 500 // Constraint for maximum length
          },
          className: 'col-md-4 col-12'
        },

        {
          key: 'location',
          type: 'input',
          props: {
            label: 'Location',
            placeholder: 'Near west wall',
            required: true
          },
          className: 'col-md-4 col-12'
        },

        {
          key: 'tableNo',

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
          className: 'col-md-3 col-12'
        },

        {
          key: 'noOfOrders',
          type: 'input',
          props: {
            label: 'Orders',
            placeholder: 'Enter Orders',
            required: true
          },
          className: 'col-md-4 col-12'
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
  openEditDetails(i){
    let item = this.crudService.list[i];
    this.nav.push('/pages/tables/edit/' + item.id);
  }

}
