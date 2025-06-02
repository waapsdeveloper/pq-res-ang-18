import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrl: './edit-roles.component.scss'
})
export class EditRolesComponent implements AfterViewInit, OnInit {
  id;
  form = new FormGroup({});
  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService,
    private route: ActivatedRoute
  ) {}

  title = 'Edit Role';
  addurl = '/pages/roles/list';
  model = {
    name: '',
    slug: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Role Name',
            placeholder: 'Enter role name',
            required: true
          },
          className: 'col-md-6 col-12' // 6 columns on md+, full width on small screens
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
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
  }
  async ngAfterViewInit() {
    const res = await this.network.getRoleById(this.id);
    let d = Object.assign({}, res.role);
    console.log(d);
    // Dynamic model assignment
    this.model = {
      name: d.name || '',
      slug: d.slug || ''
    };
  }
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
      const res = await this.network.updateRole(d, this.id);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Table added Succesfully!');

        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }
}
