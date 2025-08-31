import { ChangeDetectorRef, Component, Injector, ViewEncapsulation } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { NavService } from 'src/app/services/basic/nav.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ExpenseCategoriesService } from '../../expense-categories/expense-categories.service';
import { ExprenseService } from '../expense.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrl: './list-expense.component.scss',
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None
})
export class ListExpenseComponent extends ListBlade {
  showDeleteAllButton = false;
  canDelete;
  canEdit;
  digits;
  canView;
  canChangeStatus;
  canPaymentStatus;
  title = 'Expense';
  addurl = '/pages/expense/add';
  currency = 'USD';
  currencySymbol = '$';
  showEdit: boolean = false;
  columns: any[] = ['Name', 'Description', 'Category', 'Amount', 'Type', 'Status', 'Created ', ' Updated', 'Image'];
  override model = {
    expense: '',
    started_from: '',
    ended_at: '',
    type: '',
    status: '',
    category: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'expense',
          type: 'input',
          props: {
            label: 'Expense Name',
            placeholder: 'Enter expense name',
            required: false
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'started_from',
          type: 'input',
          props: {
            label: 'Expense Start Date',
            placeholder: 'Select start date',
            type: 'date',
            required: false
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'ended_at',
          type: 'input',
          props: {
            label: 'Expense Ended Date',
            placeholder: 'Select end date',
            type: 'date',
            required: false
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'type',
          type: 'select',
          props: {
            label: 'Type',
            placeholder: 'Select type',
            required: false,
            options: [
              { value: 'recurring', label: 'Recurring' },
              { value: 'one-time', label: 'One-time' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            placeholder: 'Select status',
            options: [
              { label: 'Paid', value: 'paid' },
              { label: 'Unpaid', value: 'unpaid' }
            ],
            required: false
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'category',
          type: 'select',
          props: {
            label: 'Category',
            placeholder: 'Select category',
            options: [],
            required: false
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        }
      ]
    }
  ];
  totalAmount: any;
  constructor(
    injector: Injector,
    private decimalPipe: DecimalPipe,
    public override crudService: ExprenseService,
    private nav: NavService,
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
    this.initialize();
    this.globalData.getDigits().subscribe((digits) => {
      this.digits = digits;
    });
    this.canDelete = this.permissionService.hasPermission('expense' + '.delete');
    this.canView = this.permissionService.hasPermission('expense' + '.view');
    this.canEdit = this.permissionService.hasPermission('expense' + '.edit');
    this.canChangeStatus = this.permissionService.hasPermission('expense' + '.status');
    this.canPaymentStatus = this.permissionService.hasPermission('expense' + '.payment_status_update');

    this.setCategoryInForm();
    this.globalData.getCurrency().subscribe((currency) => {
      this.currency = currency;
      console.log('Currency updated:', this.currency);
    });

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
  }

  get expenseTitle(): string {
    const amount = Array.isArray(this.crudService.list)
      ? this.crudService.list.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
      : 0;
    this.totalAmount = amount;
    return `Expense`;
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
     formatSpecial(value: number, digits: number): string {
  const format = `1.${digits}-${digits}`;
  return this.decimalPipe.transform(value, format, 'en-US') ?? '';
}

  initialize() {
    this.crudService.getList('', 1);
    const u = this.users.getUser();
    if (u.role_id == 1 || u.role_id == 2) {
      this.showEdit = true;
    }
  }
  async getExpenseCategory(): Promise<any[]> {
    let obj = {
      search: '',
      perpage: 500,

      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
    };
    const res = await this.network.getExpenseCategories(obj);

    if (res && res['data']) {
      let d = res['data'];
      let dm = d['data'];
      return dm.map((r) => {
        return {
          value: r.category_name,
          label: r.category_name
        };
      }) as any[];
    }

    return [];
  }
  async setCategoryInForm() {
    const res = await this.getExpenseCategory();
    console.log(res);

    for (var i = 0; i < this.fields.length; i++) {
      for (var j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key == 'category') {
          fl.props.options = res;
        }
      }
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
    this.nav.push('/pages/expense/view/' + item.id);
  }
  async openEditDetails(i) {
    let item = this.crudService.list[i];
    if (item) {
      this.nav.push('/pages/expense/edit/' + item.id);
    }
  }

  onChangePerPage($event) {
    this.getList('', 1);
  }
  onPageSizeChange(event: any): void {
    console.log('Page size changed in ListOrdersComponent:', event);
    this.changePageSize(event); // Call the inherited method from ListBlade
  }

  ProductModal(item) {
    this.utility.showProductSelectionTable('Select Products', this.currency, item.products, 'Select', (productId: string) => {
      console.log('Selected product ID:', productId);
    });
  }
  resetFilters() {
    this.model = {
      expense: '',
      started_from: '',
      ended_at: '',
      type: '',
      status: '',
      category: ''
    };
    this.crudService.resetFilters(this.model);;
  }
}
