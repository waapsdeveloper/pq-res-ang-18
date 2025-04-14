import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { UtilityService } from 'src/app/services/utility.service';
import { OrderService } from '../orders.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.scss'
})
export class ListOrdersComponent extends ListBlade {
  showDeleteAllButton = false;
  title = 'Orders';
  addurl = '/pages/orders/add';
  showEdit: boolean = false;
  columns: any[] = ['Order Id', 'Customer', 'Price', 'Table No', 'Type', 'Status'];
  statuses = ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'completed', 'cancelled'];
  selectedStatus = '';
  override model = {
    order_id: '',
    Customer_name: '',
    phone: '',
    total_price: '',
    table: '',
    type: '',
    status: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'order_id',
          type: 'input',
          props: {
            label: 'Order ID',
            placeholder: 'Enter order ID',
            required: false,
            pattern: '^[a-zA-Z0-9-_]+$', // Alphanumeric with optional hyphen/underscore
            title: 'Order ID can only contain letters, numbers, hyphens, and underscores'
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'customer_name',
          type: 'input',
          props: {
            label: 'Customer Name',
            placeholder: 'Enter customer name',
            required: false,
            minLength: 3
          },
          className: 'col-md-2 col-12'
        },
        // {
        //   key: 'phone',
        //   type: 'input',
        //   props: {
        //     label: 'Phone',
        //     placeholder: 'Enter phone number',
        //     required: false,
        //     type: 'tel',
        //     pattern: '\\d{11}',
        //     title: 'Enter a valid 10-digit phone number'
        //   },
        //   className: 'col-md-2 col-12'
        // },
        // {
        //   key: 'total_price',
        //   type: 'input',
        //   props: {
        //     label: 'Total Price',
        //     placeholder: 'Enter total price',
        //     required: false,
        //     type: 'number',
        //     min: 0,
        //     step: 0.01 // For decimal prices
        //   },
        //   className: 'col-md-2 col-12'
        // },
        {
          key: 'table',
          type: 'input',
          props: {
            label: 'Table Number',
            placeholder: 'Enter table number',
            required: false,
            type: 'number',
            min: 0
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'type',
          type: 'select',
          props: {
            label: 'Order Type',
            options: [
              { label: 'Dine-In', value: 'dine-in' },
              { label: 'Takeaway', value: 'takeaway' },
              { label: 'Delivery', value: 'delivery' }
            ],
            required: false
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Order Status',
            options: [
              { label: 'Pending', value: 'pending' },
              { label: 'Completed', value: 'completed' },
              { label: 'Cancelled', value: 'cancelled' }
            ],
            required: false
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        }
      ]
    }
  ];
  constructor(
    injector: Injector,
    public override crudService: OrderService,
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

  async getList(search = '', page = 1): Promise<any> {
    let obj = {
      search: search,
      page: page,
      perpage: this.perpage
    };

    const res = await this.network.getOrders(obj);
    if (res.data) {
      let d = res.data;
      this.page = d.current_page;
      this.lastPage = d.last_page;
      this.total = d.total;

      //      if (this.page == 1) {
      this.list = d.data;
      console.log(this.list);
      // } else {
      //   this.list = [...this.list, ...d.data];
      // }
    }

    return res;
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
  async updateStatusfromService(index: number) {
    console.log('updateStatusfromService', index);
  }

  loadMore() {
    if (this.page < this.lastPage) {
      this.getList(this.search, this.page + 1);
    }
  }

  openDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/orders/view/' + item.id);
  }
  openEditDetails(i) {
    let item = this.list[i];
    this.nav.push('/pages/orders/edit/' + item.id);
  }

  onChangePerPage($event) {
    this.getList('', 1);
  }
  getOrderStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'ready':
        return 'ready';
      case 'in progress':
        return 'in-progress';
      case 'completed':
        return 'completed';
      default:
        return '';
    }
  }

  viewDetails(order: any): void {
    console.log('Viewing details for:', order);
  }

  payBill(order: any): void {
    console.log('Paying bill for:', order);
  }
  async updateStatus(item) {
    let obj = {
      status: this.selectedStatus
    };
    console.log(obj);

    await this.network.orderStatus(item.id, obj);

    this.utility.presentSuccessToast(`Order Status Updated to ${obj.status}`);
  }
}
