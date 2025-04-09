import { Component, Injector, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ListBlade } from 'src/app/abstract/list-blade';
import { UtilityService } from 'src/app/services/utility.service';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent extends ListBlade{


  ngOnInit(): void {
    this.setRestaurantsInForm();
  }


  title = 'Categories';
  addurl = '/pages/categories/add'
  showEdit = false;
  columns: any[] = [
    'Name',
    'category',
    'Menu',
    'Status'
  ]

  override model = {
    name: '',
    status: '',
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: ' Category Name',
            placeholder: '',
          },
          className: 'col-md-2 col-12'
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
          className: 'formly-select-wrapper-3232 col-md-2 col-12'
        },
        // {
        //   key: 'description',
        //   type: 'textarea',
        //   props: {
        //     label: 'Description',
        //     placeholder: 'Enter description',
        //     required: true,
        //     rows: 3,
        //     maxLength: 500 // Optional: Limits the character count
        //   },
        //   className: 'col-md-4 col-12'
        // },


        // {
        //   key: 'status',
        //   type: 'select',
        //   props: {
        //     label: 'Status',
        //     options: [
        //       { label: 'Active', value: 'active' },
        //       { label: 'Inactive', value: 'inactive' }
        //     ],
        //     required: true
        //   },
        //   className: 'col-md-4 col-12'
        // }

      ],
    },
  ];

  constructor(
    injector: Injector,
    public override crudService: CategoryService,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService,
    private network : NetworkService
  ) {
    super(injector, crudService);
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
        if (fl.key == 'restaurant') {
          fl.props.options = res;
        }
      }
    }
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
    this.nav.push('/pages/categories/view/' + item.id);
    console.log(item.image);

  }
  openEditDetails(i){
    let item = this.crudService.list[i];
    this.nav.push('/pages/categories/edit/' + item.id);
  }


  viewMenu(item){
    this.nav.push('/pages/products/list', {category_id: item.id});
  }
  


}
