import { NavService } from 'src/app/services/basic/nav.service';
import { ProductService } from '../product.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Component, Injector } from '@angular/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent  extends ListBlade{

  title = 'Products';
  showEdit = false;
  addurl = '/pages/products/add'
  override model = {
    name: '',
    category: '',
    price: '',
    discount: '',
    status: 'active',
    type: '',
    noOfOrders: '',
    photo: ''
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
            placeholder: 'Enter name',
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'category',
          type: 'input',
          props: {
            label: 'Category',
            placeholder: 'Enter category',
            required: true
          },
          className: 'col-md-4 col-12'
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
          className: 'col-md-4 col-12'
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
          className: 'col-md-4 col-12'
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
          className: 'col-md-4 col-12'
        },
        {
          key: 'type',
          type: 'input',
          props: {
            label: 'Type',
            placeholder: 'Enter type',
            required: true
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'noOfOrders',
          type: 'input',
          props: {
            label: 'Number of Orders',
            placeholder: 'Enter number of orders',
            type: 'number',
            min: 0
          },
          className: 'col-md-4 col-12'
        },

      ],
    },
  ];

  columns: any[] = [
    'Name',
    'Category',
    'Price',
    'Type',
    'No of Orders',
    'Discount',
    'Status',

  ];

 constructor(
     injector: Injector,
     public crudService: ProductService,
     private nav: NavService,
     private utility: UtilityService,
     private users: UsersService
   ) {
     super(injector)
     this.initialize();
   }

  initialize() {
    this.crudService.getList('', 1);
    const u = this.users.getUser()
    if (u.role_id == 1 || u.role_id == 2) {
      this.showEdit = true;
    }
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
    this.nav.push('/pages/products/view/' + item.id);
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


}

