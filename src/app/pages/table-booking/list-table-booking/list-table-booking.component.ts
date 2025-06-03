import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { TableBookingService } from '../table-booking.service';
import { UtilityService } from 'src/app/services/utility.service';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-list-table-booking',
  templateUrl: './list-table-booking.component.html',
  styleUrl: './list-table-booking.component.scss'
})
export class ListTableBookingComponent extends ListBlade {
  showDeleteAllButton = false;
  canDelete;
  title = 'Table-Booking';
  addurl = '/pages/table-booking/add';

  columns: any[] = ['Name', 'Role', 'Phone', 'Email', 'Booking Date', 'Booking Time', 'Seats', 'Status'];

  override model = {
    name: '',
    booking_start: '',
    no_of_seats: '',
    status: 'active'
  };
  resetFilters() {
    this.model = {
      name: '',
      booking_start: '',
      no_of_seats: '',
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
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
        },
        {
          key: 'booking_start',
          type: 'input',
          props: {
            label: 'Booking Time',
            placeholder: ''
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
          className: 'formly-select-wrapper-3232 col-md-4 col-12'
        }
      ]
    }
  ];
  constructor(
    injector: Injector,
    public override crudService: TableBookingService,
    private nav: NavService,
    private utility: UtilityService,
    private cdr: ChangeDetectorRef,
    public events: EventsService,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {
    super(injector, crudService);
    this.initialize();
    this.canDelete = this.permissionService.hasPermission('table_booking' + '.delete');
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
    this.nav.push('/pages/table-booking/view/' + item.id);
  }
  openEditDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/table-booking/edit/' + item.id);
  }

  getRandomNumberBetween50And100(): number {
    const min = 50;
    const max = 100;
    return Math.round(Math.random() * (max - min) + min); // Generates a random number between 50 and 100
  }
}
