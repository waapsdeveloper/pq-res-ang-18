import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
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
import { GlobalDataService } from 'src/app/services/global-data.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { ListOrderPrintslipComponent } from './list-order-printslip/list-order-printslip.component';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.scss',
  providers: [DecimalPipe]

})
export class ListOrdersComponent extends ListBlade implements OnInit {
  @Output() onPrint = new EventEmitter<void>();
  isDeleted = false;
  digits;
  showDeleteAllButton = false;
  canDelete;
  isHistorySidebarOpen = false;
  paymentStatus;
  selectedItem: any;
  orderStatus;
  title = 'Order listing & filters';
  addurl = '/pages/orders/add';
  showEdit: boolean = false;
  taxAmount: number = 0;
  discountAmount: number = 0;
  subTotal: number = 0;
  totalAmount: number = 0;
  currency = 'USD';
  historyItem: any;
  currencySymbol = '$';

  columns: any[] = [
    'Order Id',
    'Customer',
    'Status',
    'Type',
    'Payment Method',
    'Source',
    'Paid',
    'Subtotal',
    'Tax',
    'Discount',
    'Tips',
    'Total',
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
    is_paid: '',
    payment_method: ''
  };
  canView: boolean;
  canEdit: boolean;
  resetFilters() {
    console.log('Resetting filters to default values');
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
      is_paid: '',
      payment_method: ''
    };
    this.crudService.resetFilters(this.model);;
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
        // {
        //   key: 'created_at',
        //   type: 'input',
        //   props: {
        //     label: 'Created At',
        //     placeholder: 'Enter created at date',
        //     required: false,
        //     type: 'date' // Use type="date" for basic date input
        //   },
        //   className: 'col-md-2 col-12'
        // },
        // {
        //   key: 'started_from',
        //   type: 'input',
        //   props: {
        //     label: 'Started From',
        //     placeholder: 'Enter started from date',
        //     required: false,
        //     type: 'date' // Use type="date" for basic date input
        //   },
        //   className: 'col-md-2 col-12'
        // },
        // {
        //   key: 'ended_at',
        //   type: 'input',
        //   props: {
        //     label: 'Ended At',
        //     placeholder: 'Enter ended at date',
        //     required: false,
        //     type: 'date' // Use type="date" for basic date input
        //   },
        //   className: 'col-md-2 col-12'
        // },

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
        {
          key: 'phone',
          type: 'input',
          props: {
            label: 'Phone',
            placeholder: 'Enter phone number',
            required: false,
            type: 'tel',
            pattern: '\\d{11}',
            title: 'Enter a valid 10-digit phone number'
          },
          className: 'col-md-2 col-12'
        },
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
        // {
        //   key: 'table',
        //   type: 'input',
        //   props: {
        //     label: 'Table Number',
        //     placeholder: 'Enter table number',
        //     required: false
        //   },
        //   className: 'col-md-2 col-12'
        // },
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
            multiple: true,
            placeholder: 'Select Order Type'
          },
          className: 'formly-select-wrapper-3333 col-md-2 col-12'
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
            required: false,
            multiple: true
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'payment_method',
          type: 'select',
          props: {
            label: 'Payment Method',
            options: [
              { label: 'Cash', value: 'cash' },
              { label: 'Card', value: 'card' }
            ],
            required: false,
            multiple: true,
            placeholder: 'Select Payment Method'
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        // {
        //   key: 'is_paid',
        //   type: 'select',
        //   props: {
        //     label: 'Payment Status',
        //     options: [
        //       { label: 'Paid', value: true },
        //       { label: 'UnPaid', value: false }
        //     ],
        //     required: false,
        //     placeholder: 'Select Payment Status'
        //   },
        //   className: 'formly-select-wrapper-3232 col-md-2 col-12'
        // }
      ]
    }
  ];
  @ViewChild(ListOrderPrintslipComponent) printSlipComponent!: ListOrderPrintslipComponent;

  triggerPrint(item) {
    this.printSlipComponent.printSlip(item);
  }
  triggerManualPrint(item) {
    this.selectedItem = item;
    this.printSlipComponent.manualPrint(this.selectedItem);
  }

  constructor(
    injector: Injector,
    public override crudService: OrderService,
    private nav: NavService,
    private decimalPipe: DecimalPipe,
    private utility: UtilityService,
    private users: UsersService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService,
    public currencyService: CurrencyService,
    private globalData: GlobalDataService,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {
    super(injector, crudService);
    // this.initialize();
    this.globalData.getCurrency().subscribe((currency) => {
      this.currency = currency;
      console.log('Currency updated:', this.currency);
    });
    this.globalData.getDigits().subscribe((digits) => {
      this.digits = digits;
      console.log('Digits updated:', this.digits);
    });
    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
    this.canDelete = this.permissionService.hasPermission('order' + '.delete');
    this.canView = this.permissionService.hasPermission('order' + '.view');
    this.canEdit = this.permissionService.hasPermission('order' + '.edit');
    this.paymentStatus = this.permissionService.hasPermission('order' + '.payment_status');
    this.orderStatus = this.permissionService.hasPermission('order' + '.order_status');
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
    this.crudService.list = [];

    this.isDeleted = this.route.snapshot.data['isDeleted'] || false;
    this.title = this.isDeleted ? 'Deleted Order Listing & Filters' : "Order Listing & Filters  ";

    if (this.isDeleted) {
      this.columns.push('Deleted At');
    }

    this.currency = this.currencyService.currency_symbol;

    // 1. Load the list first (faster UI feedback)
    if (!this.isDeleted) {
      await this.crudService.getList('', 1);
    } else {
      await this.crudService.getDeletedList('', 1);
    }
    this.taxAmount = this.crudService.amount.taxAmount;
    this.discountAmount = this.crudService.amount.discountAmount;
    this.subTotal = this.crudService.amount.subTotal;
    this.totalAmount = this.crudService.amount.totalAmount;

    // 3. Role-based UI
    const u = this.users.getUser();
    this.showEdit = (u.role_id == 1 || u.role_id == 2);
  }

  async ngOnInit() {
    this.route.data.subscribe(data => {
      this.isDeleted = data['isDeleted'] || false;
      this.initialize();
    });

  }

  // async getList(search = '', page = 1): Promise<any> {
  //   let obj = {
  //     search: search,
  //     page: page,
  //     perpage: this.perpage
  //   };

  //   const res = await this.network.getOrders(obj);
  //   if (res.data) {
  //     let d = res.data;
  //     this.page = d.current_page;
  //     this.lastPage = d.last_page;
  //     this.total = d.total;

  //     //      if (this.page == 1) {
  //     this.list = d.data;
  //     console.log(this.list);
  //     // } else {
  //     //   this.list = [...this.list, ...d.data];
  //     // }
  //   }

  //   return res;
  // }
  formatSpecial(value: number, digits: number): string {
    const format = `1.${digits}-${digits}`;
    return this.decimalPipe.transform(value, format, 'en-US') ?? '';
  }
  get orderTitleHighlightPart(): string {
    // More concise version for better mobile display
    if (!this.isDeleted) {
      return `(T: ${this.currencySymbol}${this.formatSpecial(this.taxAmount, this.digits)} | D: ${this.currencySymbol}${this.formatSpecial(this.discountAmount, this.digits)} | S: ${this.currencySymbol}${this.formatSpecial(this.subTotal, this.digits)} | Total: ${this.currencySymbol}${this.formatSpecial(this.totalAmount, this.digits)})`;
    }
    return '';
  }
  editRow(index: number) { }

  async deleteRow(index: number) {
    if (!this.canDelete) {
      alert('You do not have permission to delete.');
      return;
    }
    if (this.isDeleted) {
      await this.crudService.forceDeleteRow(index, this.utility);
      this.utility.presentSuccessToast('Deleted Sucessfully!');
      console.log('Row deleted Permanently successfully');
    }
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
      this.crudService.getList(this.search, this.page + 1);
    }
  }

  openDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/orders/view/' + item.id);
  }

  async goToHistory(i) {
    let item = this.crudService.list[i];
    this.historyItem = await this.network.getOrderHistory(item.id);
    const section = document.getElementById('historySidebar');
    section.style.display = 'block';
    this.isHistorySidebarOpen = true;
  }
  closeHistorySidebar() {
    this.isHistorySidebarOpen = false;
    const section = document.getElementById('historySidebar');
    section.style.display = 'none';
    this.historyItem = null;
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
    this.crudService.getList('', 1);
  }
  onPageSizeChange(event: any): void {
    console.log('Page size changed in ListOrdersComponent:', event);
    this.changePageSize(event); // Call the inherited method from ListBlade
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
    if (!this.orderStatus) {
      alert('You do not have permission to update order status.');
      return;
    }
    let obj = {
      status: this.selectedStatus
    };
    console.log(obj);

    await this.network.orderStatus(item.id, obj);

    this.utility.presentSuccessToast(`Order Status Updated to ${obj.status}`);
  }
  ProductModal(item) {
    console.log('Selected item:', item.products);
    this.utility.showProductSelectionTable('Select Products', this.currency, item.products, 'Select', (productId: string) => {
      console.log('Selected product ID:', productId);
    });
  }
  async restoreOrder(index: number) {
    console.log('Restoring order with index:', index);
    let item = this.crudService.list[index];


    await this.crudService.restoreItemById(item.id);
    this.utility.presentSuccessToast('Order restored successfully!');
    console.log('Order restored successfully');
    this.crudService.getDeletedList('', 1);
  }
}
