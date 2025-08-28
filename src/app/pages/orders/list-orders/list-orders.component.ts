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
import { CurrencyService } from 'src/app/services/currency.service';

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
  taxAmount: number = 0;
  discountAmount: number = 0;
  subTotal: number = 0;
  totalAmount: number = 0;

  columns: any[] = [
    'Order Id',
    'Customer',
    'Type',
    'Subtotal',
    'Tax',
    'Discount',
    'Total',
    'Address',
    'Notes',
    'Table No',
    'Paid',
    'Status',
    'Created',
    'Updated'
  ];
  statuses = ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'completed', 'cancelled'];
  selectedStatus = '';
  override model = {
    order_id: '',
    created_at: '',
    started_from: '',
    ended_at: '',
    customer_name: '',
    phone: '',
    total_price: '',
    table: '',
    type: '',
    status: '',
    is_paid: ''
  };
  resetFilters() {
    this.model = {
      order_id: '',
      created_at: '',
      started_from: '',
      ended_at: '',
      customer_name: '',
      phone: '',
      total_price: '',
      table: '',
      type: '',
      status: '',
      is_paid: ''
    };
  }

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
          key: 'created_at',
          type: 'input',
          props: {
            label: 'Created At',
            placeholder: 'Enter created at date',
            required: false,
            type: 'date' // Use type="date" for basic date input
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'started_from',
          type: 'input',
          props: {
            label: 'Started From',
            placeholder: 'Enter started from date',
            required: false,
            type: 'date' // Use type="date" for basic date input
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'ended_at',
          type: 'input',
          props: {
            label: 'Ended At',
            placeholder: 'Enter ended at date',
            required: false,
            type: 'date' // Use type="date" for basic date input
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
            required: false
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'type',
          type: 'select',
          props: {
            label: 'Order Type',
            options: [
              { label: 'Drive-Thru', value: 'drive-thru' },
              { label: 'Dine-In', value: 'dine-in' },
              { label: 'Take-Away', value: 'take-away' },
              { label: 'Delivery', value: 'delivery' },
              { label: 'Curbside Pickup', value: 'curbside-pickup' },
              { label: 'Catering', value: 'catering' },
              { label: 'Reservation', value: 'reservation' }
            ],
            required: false,
            placeholder: 'Select Order Type'
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
              { label: 'Confirmed', value: 'confirmed' },
              { label: 'Preparing', value: 'preparing' },
              { label: 'Ready for Pickup', value: 'ready_for_pickup' },
              { label: 'Out for Delivery', value: 'out_for_delivery' },
              { label: 'Delivered', value: 'delivered' },
              { label: 'Completed', value: 'completed' },
              { label: 'Cancelled', value: 'cancelled' }
            ],
            required: false
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'is_paid',
          type: 'select',
          props: {
            label: 'Payment Status',
            options: [
              { label: 'Paid', value: true },
              { label: 'UnPaid', value: false }
            ],
            required: false,
            placeholder: 'Select Payment Status'
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        }
      ]
    }
  ];
  currency: string;
  constructor(
    injector: Injector,
    public override crudService: OrderService,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService,
    public currencyService: CurrencyService
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
    this.currency = this.currencyService.currency_symbol;
    let obj = {
      search: ' '
    };
    const res = await this.network.getOrders(obj);
    console.log(res);

    if (res) {
      this.taxAmount = res.total_tax.toFixed(2);
      this.discountAmount = res.total_discount.toFixed(2);
      this.subTotal = res.total_price.toFixed(2);
      this.totalAmount = res.total_final_total.toFixed(2);
    }
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
  get orderTitleHighlightPart(): string {
    // If your API attaches these totals to the list object, adjust as needed

    return `(Tax: ${this.currency} ${this.taxAmount} | Discount: ${this.currency} ${this.discountAmount} | Subtotal: ${this.currency} ${this.subTotal} | Total: ${this.currency} ${this.totalAmount})`;
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
  async openEditDetails(i) {
    let item = this.crudService.list[i];
    if (item && item.status === 'Pending') {
      this.nav.push('/pages/orders/add/' + item.id);
    } else {
      await this.utility.showWarningMessage('You cannot edit this order as it is already in progress or completed.');
    }
  }

  onChangePerPage($event) {
    this.getList('', 1);
  }
  onPageSizeChange(event: any): void {
    console.log('Page size changed in ListOrdersComponent:', event);
    this.changePageSize(event); // Call the inherited method from ListBlade
  }
  printSlip() {
    const section = document.getElementById('print-section');
    if (!section) {
      console.error('Print section not found.');
      return;
    }

    // 1. Grab the _rendered_ HTML (with actual names, prices, looped rows)
    const html = section.innerHTML;

    // 2. Open a new window
    const printWindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (!printWindow) {
      console.error('Unable to open print window.');
      return;
    }

    // 3. Write a minimal HTML document around that rendered content
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            /* bring in any print‑only styles here */
            body { font-family: Arial, sans-serif; font-size: 12px; margin:0; padding: 8px; }
            .bill-slip { border: 1px dashed #000; padding: 8px; }
            .bill-header, .customer-info, .order-details, .bill-footer {
              margin-bottom: 10px;
            }
            table { width: 100%; border-collapse: collapse; }
            th, td { text-align: left; padding: 2px 4px; }
            th { border-bottom: 1px solid #000; }
          </style>
        </head>
        <body>
          <div class="bill-slip">
            ${html}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();

    // 4. Print & close
    printWindow.focus();
    printWindow.print();
    printWindow.close();
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
  ProductModal(item) {
    console.log(this.crudService.list);
    this.utility.showProductSelectionTable('Select Products', item.products, 'Select', (productId: string) => {
      console.log('Selected product ID:', productId);
    });
  }
}
