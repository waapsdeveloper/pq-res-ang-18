import { ChangeDetectorRef, Component, Injector, ViewEncapsulation } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { NavService } from 'src/app/services/basic/nav.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';
import { OrderService } from '../../orders/orders.service';
import { ExpenseCategoriesService } from '../expense-categories.service';

@Component({
  selector: 'app-list-expense-categories',
  templateUrl: './list-expense-categories.component.html',
  styleUrl: './list-expense-categories.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListExpenseCategoriesComponent extends ListBlade {
  showDeleteAllButton = false;
  title = 'Orders';
  addurl = '/pages/orders/add';
  showEdit: boolean = false;
  columns: any[] = ['Image', 'Name', 'Description', 'Status', 'Created', 'Updated'];
  override model = {
    expense_name: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'expense_name',
          type: 'input',
          props: {
            label: 'Expense Name',
            placeholder: 'Enter expense name',
            required: false
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        }
      ]
    }
  ];
  constructor(
    injector: Injector,
    public override crudService: ExpenseCategoriesService,
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
    this.nav.push('/pages/expense-categories/view/' + item.id);
  }
  async openEditDetails(i) {
    let item = this.crudService.list[i];
    if (item) {
      this.nav.push('/pages/expense-categories/edit/' + item.id);
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

  ProductModal(item) {
    this.utility.showProductSelectionTable('Select Products', item.products, 'Select', (productId: string) => {
      console.log('Selected product ID:', productId);
    });
  }
}
