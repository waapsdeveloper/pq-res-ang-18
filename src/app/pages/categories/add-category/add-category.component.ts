import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
  form = new FormGroup({});
  model = {
    name: '',
    category_id: '',
    status: '',
    description: '',
    image: '',
    imageBase64: ''
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
            required: true,
            minLength: 3
          },
          className: 'col-md-2 col-12' // 3 columns on md+, full width on small screens
        },
       
        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter description'
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'category_id',
          type: 'select',
          props: {
            label: 'Category',
            placeholder: 'Select a parent category',
            options: []
          },
          className: 'col-md-2 col-12'
        },
        {
          key: 'image',
          type: 'input',
          props: {
            label: 'Image',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            required: true,
            change: (field, event) => this.onFileChange(field, event, 'imageBase64')
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
          className: 'col-md-2 col-12'
        }
      ]
    }
  ];

  constructor(
    private fb: FormBuilder,
    private network: NetworkService,
    private nav: NavService,
    private utility: UtilityService
  ) {}

  ngOnInit(): void {
    this.setCategoriesInForm();
    this.setRestaurantsInForm();
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
      perpage: 500,

      restaurant_id: localStorage.getItem('restuarant_id') ? localStorage.getItem('restuarant_id') : -1
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

      restaurant_id: localStorage.getItem('restuarant_id') ? localStorage.getItem('restuarant_id') : -1
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

  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);
      d['image'] = this.model.imageBase64;
      const res = await this.network.addCategory(d);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Category Created Succesfully!');
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
