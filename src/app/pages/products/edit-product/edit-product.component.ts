import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit, AfterViewInit {
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
    const res = await this.network.getProductsById(this.id);
    console.log(res);
  }
  form = new FormGroup({});
  model = {
    name: '',
    category_id: '',
    restaurant_id: null,
    description: '',
    status: '',
    price: null,
    image: '',
    imageBase64: '',
    discount: null,
    notes: '',
    sizes: '',
    spicy: '',
    type: ''
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Product Name',
            placeholder: 'Enter product name',
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
        },
        {
          key: 'category_id',
          type: 'select',
          props: {
            label: 'category',
            placeholder: 'Select a category',
            options: []
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'restaurant_id',
          type: 'select',
          props: {
            label: 'Restaurant',
            placeholder: 'Select a restaurant',
            required: false, // nullable
            options: []
          },
          className: 'col-md-4 col-12'
        }
      ]
    },
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'description',
          type: 'input',
          props: {
            label: 'Description',
            placeholder: 'Enter description',
            required: true,
            minLength: 3
          },
          className: 'col-md-4 col-12' // 3 columns on md+, full width on small screens
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
          className: 'col-md-4 col-12'
        }
      ]
    },
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        {
          key: 'price',
          type: 'input',
          props: {
            label: 'Price',
            placeholder: 'Set a regular price',
            type: 'number'
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'image',
          type: 'input',
          props: {
            label: 'Image',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            change: (field, event) => this.onFileChange(field, event, 'imageBase64')
          },
          className: 'col-md-4 col-12'
        },
        {
          key: 'discount',
          type: 'input',
          props: {
            label: 'Discount',
            placeholder: 'Set a discount',
            type: 'number'
          },
          className: 'col-md-4 col-12'
        }
      ]
    },
    {
      fieldGroupClassName: 'row', // Bootstrap row
      fieldGroup: [
        // option for small medium large - select
        {
          key: 'sizes',
          type: 'multicheckbox',
          props: {
            label: 'Sizes',
            options: [
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' }
            ]
          },
          className: 'col-md-4 col-12'
        },
        // option for spicy level - select
        {
          key: 'spicy',
          type: 'multicheckbox',
          props: {
            label: 'Spicy Level',
            options: [
              { value: 'mild', label: 'Mild' },
              { value: 'medium', label: 'Medium' },
              { value: 'hot', label: 'Hot' }
            ]
          },
          className: 'col-md-4 col-12'
        },
        // options for either breakfast, lunch or dinner - select
        {
          key: 'type',
          type: 'multicheckbox',
          props: {
            label: 'Type',
            options: [
              { value: 'breakfast', label: 'Breakfast' },
              { value: 'lunch', label: 'Lunch' },
              { value: 'dinner', label: 'Dinner' }
            ]
          },
          className: 'col-md-4 col-12'
        }
      ]
    }
  ];
  async ngAfterViewInit() {
    const res = await this.network.getProductsById(this.id);
    let d = Object.assign({}, res.product);
    console.log(d);
    this.model = {
      name: d.name || '',
      category_id: d.category_id || null,
      restaurant_id: d.restaurant_id || null,
      description: d.description || '',
      status: d.status || '',
      price: d.price || null,
      image: '',
      imageBase64: d.imageBase64 || '',
      discount: d.discount || null,
      notes: d.notes || '',
      sizes: JSON.parse(d.sizes) || '',
      spicy: d.spicy || '',
      type: d.type || ''
    };
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
      perpage: 500
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
  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);

      d['image'] = this.model.imageBase64;
      console.log(d);

      const res = await this.network.updateProduct(d, this.id);
      console.log(res);
      if (res) {
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
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
        // this.fields[0].fieldGroup[6].props['value'] = base64String; // Update the field value
        // this.fields[0].fieldGroup[6].formControl.setValue(base64String); // Update the form control value

        // field.formControl.setValue(base64String); // Update the form control value
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  }
}
