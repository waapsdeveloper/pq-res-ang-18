import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  form = new FormGroup({});

  variations: any[] = [];
  addAttributeInput = '';

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
    notes: ''
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
            required: true,
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
    }
    // {
    //   fieldGroupClassName: 'row', // Bootstrap row
    //   fieldGroup: [
    //     // option for small medium large - select
    //     {
    //       key: 'sizes',
    //       type: 'multicheckbox',
    //       props: {
    //         label: 'Sizes',
    //         options: [
    //           { value: 'small', label: 'Small' },
    //           { value: 'medium', label: 'Medium' },
    //           { value: 'large', label: 'Large' }
    //         ]
    //       },
    //       className: 'col-md-4 col-12'
    //     },
    //     // option for spicy level - select
    //     {
    //       key: 'spicy',
    //       type: 'multicheckbox',
    //       props: {
    //         label: 'Spicy Level',
    //         options: [
    //           { value: 'mild', label: 'Mild' },
    //           { value: 'medium', label: 'Medium' },
    //           { value: 'hot', label: 'Hot' }
    //         ]
    //       },
    //       className: 'col-md-4 col-12'
    //     },
    //     // options for either breakfast, lunch or dinner - select
    //     {
    //       key: 'type',
    //       type: 'multicheckbox',
    //       props: {
    //         label: 'Type',
    //         options: [
    //           { value: 'breakfast', label: 'Breakfast' },
    //           { value: 'lunch', label: 'Lunch' },
    //           { value: 'dinner', label: 'Dinner' }
    //         ]
    //       },
    //       className: 'col-md-4 col-12'
    //     }
    //   ]
    // }
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private network: NetworkService,
    private nav: NavService,
    private utility: UtilityService
  ) {}

  ngOnInit(): void {
    this.setCategoriesInForm();
    this.setRestaurantsInForm();
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

      // d['sizes'] = JSON.stringify(d['sizes'])
      // d['spicy'] = JSON.stringify(d['spicy'])
      // d['type'] = JSON.stringify(d['type'])

      d['variation'] = this.variations;

      const res = await this.network.addProduct(d);
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

  addAttributes() {
    let v = this.addAttributeInput.trim();

    if (!v || v == '') {
      return;
    }

    let findIndex = this.variations.findIndex((x) => x.type == v);
    if (findIndex == -1) {
      this.addVariation(v);
    }

    this.addAttributeInput = '';
  }

  selectAttribute(type) {
    this.variations = this.variations.map((item) => {
      item.selected = item.type == type;
      return item;
    });
  }

  addVariation(type) {
    this.variations = this.variations.map((item) => {
      item['selected'] = false;
      return item;
    });

    this.variations.push({
      type: type, // e.g., "Size",
      selected: true,
      options: [
        { name: '', description: '', price: 0 } // Default empty option
      ]
    });
  }

  addItemINVariation() {
    const index = this.variations.findIndex((x) => x.selected == true);
    if (index == -1) {
      return;
    }

    this.variations[index]['options'].push({ name: '', description: '', price: 0 });
  }

  // Add a new option to a variation
  addOption(variationIndex: number) {
    this.variations[variationIndex].options.push({ name: '', description: '', price: 0 });
  }
  // Remove an option from a variation
  removeOption(variationIndex: number, optionIndex: number) {
    this.variations[variationIndex].options.splice(optionIndex, 1);
  }
}
