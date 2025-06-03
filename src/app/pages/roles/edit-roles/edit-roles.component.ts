import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { PermissionService } from 'src/app/services/permission.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent implements AfterViewInit, OnInit {
  id;
  form = new FormGroup({});
  model = {
    name: '',
    slug: '',
    permissions: {}
  };
  fields: FormlyFieldConfig[] = [];

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private permissionService: PermissionService
  ) {}

  title = 'Edit Role';
  addurl = '/pages/roles/list';

  permissions = this.permissionService.genericPermissions;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngAfterViewInit() {
    const res = await this.network.getRoleById(this.id);
    const d = Object.assign({}, res.role);

    this.model = {
      name: d.name || '',
      slug: d.slug || '',
      permissions: this.mapPermissionsToModel(d.permissions || [])
    };

    console.log('Role Data:', this.model);

    this.fields = [
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
              label: 'Slugs',
              placeholder: 'Enter slugs (comma separated)',
              required: true
            },
            className: 'col-md-6 col-12'
          }
        ]
      }
    ];

    this.cdr.detectChanges();
  }

  private mapPermissionsToModel(permissionsArr: any[]): any {
    const permissions = {};
    permissionsArr.forEach((item) => {
      const slug = item.slug.trim().toLowerCase();
      const [entity] = slug.split('.');
      if (!permissions[entity]) {
        permissions[entity] = [];
      }
      permissions[entity].push(slug);
    });
    return permissions;
  }

  onCheckboxChange(event: Event, entity: string) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    console.log('Checkbox changed:', entity, value, checkbox.checked);
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

    console.log('Submitted Model:', model);

    const cleanedPermissions = this.stripEntityFromPermissions(model);

    const m = this.model
    m.permissions = cleanedPermissions;


    // loop over permissions in model and remove entity name from all the permission values

    // const payload = {
    //   ...this.form.value,
    //   permissions: Object.keys(this.model.permissions).flatMap((key) =>
    //     this.model.permissions[key].map((perm) => ({ slug: perm }))
    //   )
    // };

    const res = await this.network.updateRole(m, this.id);
    if (res) {
      this.utility.presentSuccessToast('Role updated successfully!');
      this.nav.pop();
    } else {
      this.utility.presentFailureToast('Failed to update role.');
    }
  }

  returnLabel(op: string): string {
    return this.toTitleCase(op.replace(/_/g, ' '));
  }

  private toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
}
