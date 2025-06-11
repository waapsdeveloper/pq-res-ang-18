import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';
import { FormGroup } from '@angular/forms';
import { CouponsService } from '../coupons.service';
import { EventsService } from 'src/app/services/events.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-list-coupons',
  templateUrl: './list-coupons.component.html',
  styleUrl: './list-coupons.component.scss'
})
export class ListCouponsComponent extends ListBlade {
  columns: any[] = ['Coupon Code', 'Discount', 'Usage Limit', 'Used Count', 'expires at', 'Status'];
  title = 'Coupon';
  showEdit = false;
  addurl = '/pages/coupons/add';
  showDeleteAllButton = false;
  currency = 'USD';
  currencySymbol = '$';
  canDelete;
  canView;
  canEdit;

  override form = new FormGroup({});
  override model = {
    code: '',
    discount: '',
    discount_type: '',
    usage_limit: '',
    usage_count: '',
    expires_at: '',
    is_active: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'code',
          type: 'input',
          props: {
            label: 'Coupon Code',
            placeholder: 'Enter coupon code',
            required: true,
            minLength: 3
          },
          className: 'col-md-2 col-12' // 6 columns on md+, full width on small screens
        },
        {
          key: 'discount',
          type: 'input',
          props: {
            label: 'Discount',
            placeholder: 'Enter discount',
            required: true,
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'discount_type',
          type: 'input',
          props: {
            label: 'Discount Type',
            placeholder: 'Enter discount type',
            required: true,
            maxLength: 500 // Constraint for maximum length
          },
          className: 'col-md-2 col-12'
        },

        // {
        //   key: 'location',
        //   type: 'input',
        //   props: {
        //     label: 'Location',
        //     placeholder: 'Near west wall',
        //     required: true,
        //   },
        //   className: 'col-md-6 col-12',
        // },
        {
          key: 'is_active',
          type: 'select',
          props: {
            label: 'Status',
            placeholder: 'Select status',
            required: true,
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        {
          key: 'usage_limit',
          type: 'input',
          props: {
            label: 'Usage Limit',
            placeholder: 'Enter usage limit',
            required: true,
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'usage_count',
          type: 'input',
          props: {
            label: 'Usage Count',
            placeholder: 'Enter Usage Count',
            required: true,
            type: 'number', // Ensures numeric input
            max: 255 // Constraint for maximum value
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'expires_at',
          type: 'input',
          templateOptions: {
            label: 'Date of Birth',
            type: 'date',
            placeholder: 'Select a date',
            required: true
          },
          className: 'col-md-2 col-12'
        }
      ]
    }
  ];

  constructor(
    injector: Injector,
    public override crudService: CouponsService,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService,
    private globalData: GlobalDataService,
    private route: ActivatedRoute,
    private permissionService: PermissionService
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
    this.canDelete = this.permissionService.hasPermission('coupon' + '.delete');
    this.canView = this.permissionService.hasPermission('coupon' + '.view');
    this.canEdit = this.permissionService.hasPermission('coupon' + '.edit');
  }

  initialize() {
    this.crudService.getList('', 1);
    const u = this.users.getUser();
    if (u.role_id == 1 || u.role_id == 2) {
      this.showEdit = true;
    }
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
    this.nav.push('/pages/coupons/view/' + item.id);
  }
  openEditDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/coupons/edit/' + item.id);
  }
  resetFilters() {
    this.model = {
      code: '',
      discount: '',
      discount_type: '',
      usage_limit: '',
      usage_count: '',
      expires_at: '',
      is_active: ''
    };
  }
}
