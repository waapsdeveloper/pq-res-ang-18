import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditCategoryComponent implements OnInit {
  id;

  constructor(
    private route: ActivatedRoute,
    private network: NetworkService,
    private fb: FormBuilder,
    private nav: NavService,
    private utility: UtilityService
  ) {}

  ngOnInit() {
    this.setCategoriesInForm();
    this.setRestaurantsInForm();
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
    this.initialize();
  }

  async initialize() {
    // Fetch the data from the server
    const res = await this.network.getCategoriesById(this.id);
    console.log(res);
  }

  form = new FormGroup({});
  model = {
    name: '',
    category_id: '',
    status: '',
    description: '',
    image: '',
    imageBase64: '',
    src_img: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Category Name',
            placeholder: 'Enter category name',
            required: true, // Ensure required is true
            minLength: 3
          },
          className: 'col-md-6 col-12' // 3 columns on md+, full width on small screens
        },

        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter description',
            required: true // Ensure required is true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'category_id',
          type: 'select',
          props: {
            label: 'Category',
            placeholder: 'Select a parent category',
            options: []
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'image',
          type: 'input',
          props: {
            label: 'Category Image',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            change: (field, event) => this.onFileChange(field, event, 'imageBase64')
          },
          className: 'formly-image-wrapper-3232 col-md-6 col-12'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ],
            required: true // Ensure required is true
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
        }
      ]
    }
  ];
  async setCategoriesInForm() {
    const res = await this.getCategories();
    console.log(res);

    for (var i = 0; i < this.fields.length; i++) {
      for (var j = 0; j < this.fields[i].fieldGroup.length; j++) {
        let fl = this.fields[i].fieldGroup[j];
        if (fl.key == 'category_id') {
          fl.props.options = res;
        }
      }
    }
  }
  async getCategories(): Promise<any[]> {
    let obj = {
      search: '',
      perpage: 500,

      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
    };
    const res = await this.network.getCategories(obj);

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

  async getRestaurants(): Promise<any[]> {
    let obj = {
      search: '',
      perpage: 500,

      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1
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
  async ngAfterViewInit() {
    const res = await this.network.getCategoriesById(this.id);
    let d = Object.assign({}, res.category);
    console.log(d);
    this.model = {
      name: d?.name || '',
      category_id: d?.id || '', // Included as it exists in `model`
      status: (d?.status || '').toLowerCase(),
      description: d?.description || '',
      image: d.image,
      src_img: d?.image || '',
      imageBase64: d?.imageBase64 || ''
    };
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
  onFileChange(field, event: Event, type: string = 'image') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        console.log(base64String);

        this.model[type] = base64String; // Update the model
        this.model['src_img'] = base64String;
        // this.fields[0].fieldGroup[6].props['value'] = base64String; // Update the field value
        // this.fields[0].fieldGroup[6].formControl.setValue(base64String); // Update the form control value

        // field.formControl.setValue(base64String); // Update the form control value
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  }
  async onSubmit(model) {
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation styles
      this.form.markAllAsTouched();
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }

    console.log(model);
    console.log('Form Submitted', this.form.value);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);

      d['image'] = this.model.imageBase64;

      const res = await this.network.updateCategory(d, this.id);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Category Updated!');
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }
}
