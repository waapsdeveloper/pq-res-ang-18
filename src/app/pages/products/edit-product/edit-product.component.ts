import { AfterViewInit, Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class EditProductComponent implements OnInit, AfterViewInit {
  id;
  filteredSuggestions: any[] = [];
  private searchSubject = new Subject<string>();
  variations: any[] = [];
  addAttributeInput = '';

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
    this.searchSubject
      .pipe(
        debounceTime(300), // Delay for user input
        distinctUntilChanged(), // Ignore identical inputs
        switchMap(async (query) => {
          await this.fetchSuggestions(query);
          return this.filteredSuggestions;
        }) // Fetch suggestions
      )
      .subscribe((suggestions) => {
        this.filteredSuggestions = suggestions;
      });
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
    this.initialize();
  }
  onInputChange(query: string) {
    this.fetchSuggestions(query); // Fetch and display suggestions based on input
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
      fieldGroupClassName: 'row', // Single row for all fields
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
          className: 'col-md-2 col-12'
        },
        {
          key: 'category_id',
          type: 'select',
          props: {
            label: 'Category',
            placeholder: 'Select a category',
            options: []
          },
          className: 'col-md-2 col-12'
        },

        {
          key: 'description',
          type: 'input',
          props: {
            label: 'Description',
            placeholder: 'Enter description',
            required: true,
            minLength: 3
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
        },
        {
          key: 'price',
          type: 'input',
          props: {
            label: 'Price',
            placeholder: 'Set a regular price',
            type: 'number'
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
          key: 'discount',
          type: 'input',
          props: {
            label: 'Discount',
            placeholder: 'Set a discount',
            type: 'number'
          },
          className: 'col-md-2 col-12'
        }
      ]
    }
  ];

  async ngAfterViewInit() {
    const res = await this.network.getProductsById(this.id);
    let d = Object.assign({}, res.product);
    console.log(d);

    /*
    [
    {
        "id": 20,
        "product_id": 296,
        "meta_key": "sizes",
        "meta_value": "{\"small\":true,\"medium\":false,\"large\":false}",
        "meta_key_type": "string",
        "created_at": "2024-12-28T18:00:13.000000Z",
        "updated_at": "2024-12-28T18:00:13.000000Z"
    },
    {
        "id": 21,
        "product_id": 296,
        "meta_key": "spicy",
        "meta_value": "{\"mild\":false,\"medium\":false,\"hot\":false}",
        "meta_key_type": "string",
        "created_at": "2024-12-28T18:00:13.000000Z",
        "updated_at": "2024-12-28T18:00:13.000000Z"
    },
    {
        "id": 22,
        "product_id": 296,
        "meta_key": "type",
        "meta_value": "{\"breakfast\":false,\"lunch\":true,\"dinner\":false}",
        "meta_key_type": "string",
        "created_at": "2024-12-28T18:00:13.000000Z",
        "updated_at": "2024-12-28T18:00:13.000000Z"
    }
]
    */

    const f = d['variation'] && d['variation'].length > 0 ? d['variation'][0] : null;
    if (f) {
      const metaValue = f['meta_value'] ? JSON.parse(f['meta_value']) : null;

      if (metaValue) {
        this.variations = metaValue;
        console.log(this.variations);
      }
    }

    // let spicyObj = d['props'] ? d['props'].find((x) => x.meta_key == 'spicy') : null;
    // if (spicyObj) {
    //   d['spicy'] = spicyObj['meta_value'] ? JSON.parse(spicyObj['meta_value']) : null;
    // }

    // let typeObj = d['props'] ? d['props'].find((x) => x.meta_key == 'type') : null;
    // if (typeObj) {
    //   d['type'] = typeObj['meta_value'] ? JSON.parse(typeObj['meta_value']) : null;
    // }

    this.model = {
      name: d.name || '',
      category_id: d.category_id || null,
      description: d.description || '',
      status: d.status || '',
      price: d.price || null,
      image: '',
      imageBase64: d.imageBase64 || '',
      discount: d.discount || null,
      notes: d.notes || '',
      sizes: d.sizes || '',
      spicy: d.spicy || '',
      type: d.type || ''
    };
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
  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);

      d['image'] = this.model.imageBase64;

      // d['sizes'] = JSON.stringify(d['sizes']);
      // d['spicy'] = JSON.stringify(d['spicy']);
      // d['type'] = JSON.stringify(d['type']);
      d['variation'] = this.variations;
      const res = await this.network.updateProduct(d, this.id);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Product Info Updated!');

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
  async fetchSuggestions(query: string) {
    let v = query.trim();

    if (!v) {
      this.filteredSuggestions = []; // Clear suggestions if input is empty
      return;
    }

    let obj = {
      search: v
    };

    const res = await this.network.getVariations(obj);
    let array = res?.data?.data || [];
    this.filteredSuggestions = array;
  }

  selectSuggestion(suggestion: any) {
    console.log(suggestion);
    let meta = JSON.parse(suggestion.meta_value);
    console.log(meta);

    this.addAttributeInput = suggestion.name;
    this.variations = [
      ...this.variations,
      ...meta.map((metaItem: any) => ({
        type: metaItem.type,
        selected: false,
        options: metaItem.options || []
      }))
    ];

    // Fill input with the selected suggestion
    // this.filteredSuggestions = []; // Clear suggestions
  }
}
