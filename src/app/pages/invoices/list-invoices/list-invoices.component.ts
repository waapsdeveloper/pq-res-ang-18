import { Component, Injector } from '@angular/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { UtilityService } from 'src/app/services/utility.service';
import { InvoiceService } from '../invoice.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.scss'],
})
export class ListInvoicesComponent  extends ListBlade{
  columns: any[] = ['Invoice Number', 'Order Number', 'Date', 'Method', 'Total Price', 'Status'];
  showEdit = false;
  title = 'Invoices';
  addurl = '/pages/invoices/add';


 override model = {
    products: '',
    quanity: '',
    price: '',
    total_price: '',
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
            label: 'Branch Name',
            placeholder: 'Enter Branch name',
            required: true,
            minLength: 3
          },
          className: 'col-md-2 col-12' // 3 columns on md+, full width on small screens
        },

        {
          key: 'address',
          type: 'input',
          props: {
            label: 'Address',
            placeholder: 'Enter address',
            required: true
          },
          className: 'col-md-2 col-12'
        },

      ],
    },
  ];
 constructor(
     injector: Injector,
     public override crudService: InvoiceService,
     private nav: NavService,
     private utility: UtilityService,
     private users: UsersService
   ) {
     super(injector, crudService)
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
      this.utility.presentSuccessToast('Deleted Sucessfully!');

      console.log('Row deleted successfully');
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }


  openDetails(i) {
    let item = this.crudService.list[i];
    this.nav.push('/pages/invoices/view/' + item.id);
  }



}
