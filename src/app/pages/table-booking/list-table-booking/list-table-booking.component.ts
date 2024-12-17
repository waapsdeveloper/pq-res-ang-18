import { Component, Injector } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { TableBookingService } from '../table-booking.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-table-booking',
  templateUrl: './list-table-booking.component.html',
  styleUrl: './list-table-booking.component.scss'
})
export class ListTableBookingComponent extends ListBlade {
  title = 'Table-Booking';
  addurl = '/pages/table-booking/add'

  columns: any[] = [
    'Name',
    'phone',
    'address',
    'Status',
  ]

  override model = {
    name: '',
    phone: '',
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
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone',
            placeholder: '',
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone',
            placeholder: 'Enter phone number',
            required: true,
            type: 'tel',
            pattern: '\\d{10}', // Adjust the regex based on your phone format (e.g., 10-digit numbers)
            title: 'Enter a valid 10-digit phone number'
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
    public crudService: TableBookingService,
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
    let item = this.list[i];
    this.nav.push('/pages/users/view/' + item.id);
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

  getRandomNumberBetween50And100(): number {
    const min = 50;
    const max = 100;
    return Math.round(Math.random() * (max - min) + min); // Generates a random number between 50 and 100
  }



}
