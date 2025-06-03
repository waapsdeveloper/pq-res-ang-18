import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrl: './add-roles.component.scss'
})
export class AddRolesComponent {
  form = new FormGroup({});
  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  title = 'Add Role';
  addurl = '/pages/roles/list';
  model = {
    name: '',
    slug: '',
    permissions: {}
  };

  permissions = [
    { entity: 'user', operations: ['add', 'update', 'delete', 'list', 'filter'] },
    { entity: 'product', operations: ['add', 'update', 'delete', 'list', 'filter'] },
    { entity: 'category', operations: ['add', 'update', 'delete', 'list', 'filter'] },
    { entity: 'variation', operations: ['add', 'update', 'delete', 'list', 'filter'] },
    { entity: 'table', operations: ['add', 'update', 'delete', 'list', 'filter'] },
    { entity: 'table_booking', operations: ['add', 'update', 'delete', 'list', 'filter'] },
    { entity: 'expense_category', operations: ['add', 'update', 'delete', 'list', 'filter'] },
    { entity: 'expense', operations: ['add', 'update', 'delete', 'list', 'filter', 'status', 'payment_status_update'] },
    { entity: 'coupon', operations: ['add', 'update', 'delete', 'list', 'filter'] },
    { entity: 'message', operations: ['add', 'update', 'delete', 'list', 'filter'] },
    { entity: 'order', operations: ['add', 'update', 'delete', 'list', 'filter', 'payment_status', 'order_status', 'menu'] },
    { entity: 'branch', operations: ['add', 'update', 'delete', 'list', 'filter', 'set_default', 'config_button'] },
  ];
  getPermissionsFields(): FormlyFieldConfig {
    return {
      fieldGroupClassName: 'row',
      templateOptions: { label: 'Permissions' },
      fieldGroup: this.permissions.map((perm) => ({
        key: `permissions.${perm.entity}`,
        type: 'multicheckbox',
        props: {
          label: perm.entity.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          options: perm.operations.map(op => ({
            value: op,
            label: op.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          }))
        },
        className: 'col-12 mb-2'
      }))
    };
  }

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Role Name',
            placeholder: 'Enter role name',
            required: true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'slug',
          type: 'input',
          props: {
            label: 'Slug',
            placeholder: 'Enter slug (comma separated)',
            required: true
          },
          className: 'col-md-6 col-12'
        }
      ]
    },
    this.getPermissionsFields()
  ];
  async onSubmit(model) {
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation styles
      this.form.markAllAsTouched();
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }

    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = this.form.value;
      const res = await this.network.addRole(d);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Role added Succesfully!');

        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }
}
