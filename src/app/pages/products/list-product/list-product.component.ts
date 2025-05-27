import { NavService } from 'src/app/services/basic/nav.service';
import { ProductService } from '../product.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ChangeDetectorRef, Component, Injector, ViewEncapsulation } from '@angular/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { UtilityService } from 'src/app/services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListProductComponent extends ListBlade {
  showDeleteAllButton = false;
  title = 'Products';
  showEdit = false;
  addurl = '/pages/products/add';

  currency = 'USD';
  currencySymbol = '$';

  override model = {
    name: '',
    category: '',
    restaurant_id: null,
    description: '',
    status: '',
    price: null,
    image: null,
    discount: null,
    notes: ''
  };
  resetFilters() {
    this.model = {
      name: '',
      category: '',
      restaurant_id: null,
      description: '',
      status: '',
      price: null,
      image: null,
      discount: null,
      notes: ''
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
            placeholder: 'Enter name',
            required: true,
            minLength: 3
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'category',
          type: 'input',
          props: {
            label: 'Category',
            placeholder: 'Enter category',
            required: true
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'restaurant_id',
          type: 'select',
          props: {
            label: 'Restaurant',
            placeholder: 'Select a restaurant',
            required: false, // nullable
            options: [
              // Populate dynamically with restaurant IDs and names
              { value: 1, label: 'Restaurant 1' },
              { value: 2, label: 'Restaurant 2' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'price',
          type: 'input',
          props: {
            label: 'Price',
            placeholder: 'Enter price',
            required: true,
            type: 'number',
            min: 0
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'discount',
          type: 'input',
          props: {
            label: 'Discount',
            placeholder: 'Enter discount',
            type: 'number',
            min: 0
          },
          className: 'col-md-2 col-12'
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
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'type',
          type: 'input',
          props: {
            label: 'Type',
            placeholder: 'Enter type',
            required: true
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'noOfOrders',
          type: 'input',
          props: {
            label: 'No. of Orders',
            placeholder: '',
            type: 'number',
            min: 0
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'notes',
          type: 'textarea',
          props: {
            label: 'Notes',
            placeholder: '',
            required: false
          },
          className: 'col-md-2 col-12'
        }
      ]
    }
  ];

  columns: any[] = ['Name', 'Category', 'Price', 'Type', 'Orders', 'Discount', 'Status'];

  category_id;

  constructor(
    injector: Injector,
    public override crudService: ProductService,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService,
    private network: NetworkService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public events: EventsService,
    public currencyService: CurrencyService,
    private globalData: GlobalDataService
  ) {
    super(injector, crudService);

    this.initialize();

    this.globalData.getCurrency().subscribe((currency) => { 
      this.currency = currency;
      console.log('Currency updated:', this.currency);
    });

    this.globalData.getCurrencySymbol().subscribe((symbol) => { 
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });


  }

  onPageSizeChange(event: any): void {
    console.log('Page size changed in ListOrdersComponent:', event);
    this.changePageSize(event); // Call the inherited method from ListBlade
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
    const params = this.nav.getQueryParams();
    console.log('ID from URL:', params);

    if (params && params['category_id']) {
      this.category_id = params['category_id'];
      this.crudService.filters = params as any;
    }

    this.crudService.getList('', 1);
    const u = this.users.getUser();
    if (u.role_id == 1 || u.role_id == 2) {
      this.showEdit = true;
    }
  }
  ngOnInit(): void {
    this.setRestaurantsInForm();
  }

  async getRestaurants(): Promise<any[]> {
    let obj = {
      search: '',
      perpage: 500
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
    this.nav.push('/pages/products/view/' + item.id);
  }
  EditOpenDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/products/edit/' + item.id);
  }
}
