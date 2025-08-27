import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { PermissionService } from 'src/app/services/permission.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrl: './add-roles.component.scss'
})
export class AddRolesComponent {
  form = new FormGroup({});
  model = {
    name: '',
    slug: '',
    permissions: {}
  };

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService,
    private permissionService: PermissionService
  ) {}

  title = 'Add Role';
  addurl = '/pages/roles/list';

  permissions = this.permissionService.genericPermissions;

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
    }
    // Removed permissions Formly field, handled manually in template
  ];

  onCheckboxChange(event: Event, entity: string) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (!this.model.permissions[entity]) {
      this.model.permissions[entity] = [];
    }

    if (checkbox.checked) {
      if (!this.model.permissions[entity].includes(value)) {
        this.model.permissions[entity].push(value);
      }
    } else {
      this.model.permissions[entity] = this.model.permissions[entity].filter((v) => v !== value);
    }
  }

  stripEntityFromPermissions(model: { permissions: Record<string, string[]> }) {
    const strippedPermissions: Record<string, string[]> = {};

    for (const entity in model.permissions) {
      if (Object.prototype.hasOwnProperty.call(model.permissions, entity)) {
        strippedPermissions[entity] = model.permissions[entity].map((perm) => {
          // Remove "entity." prefix if present
          if (perm.startsWith(entity + '.')) {
            return perm.substring(entity.length + 1);
          }
          return perm;
        });
      }
    }

    return strippedPermissions;
  }

  async onSubmit(model) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }

    const cleanedPermissions = this.stripEntityFromPermissions(model);
    const m = this.model;
    m.permissions = cleanedPermissions;

    const res = await this.network.addRole(m);
    if (res) {
      this.utility.presentSuccessToast('Role added Succesfully!');
      this.nav.pop();
    } else {
      this.utility.presentFailureToast('Failed to add role.');
    }
  }

  returnLabel(op: string): string {
    return this.toTitleCase(op.replace(/_/g, ' '));
  }

  private toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  selectAllPermissions() {
    this.permissions.forEach((perm) => {
      if (!this.model.permissions[perm.entity]) {
        this.model.permissions[perm.entity] = [];
      }
      perm.operations.forEach((op) => {
        const value = `${perm.entity}.${op}`;
        if (!this.model.permissions[perm.entity].includes(value)) {
          this.model.permissions[perm.entity].push(value);
        }
      });
    });
  }
}
