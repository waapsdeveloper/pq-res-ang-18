import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent {
  form = new FormGroup({});
  filteredSuggestions: any[] = [];
  private searchSubject = new Subject<string>();
  variations: any[] = [];
  addAttributeInput = '';

  // File size limit - 1MB
  readonly MAX_FILE_SIZE = 3 * 1024 * 1024; // 1MB in bytes

  // File validation variables
  selectedFile: File | null = null;
  fileError: string = '';

  model = {
    name: '',
    category_id: '',
    description: '',
    status: 'active',
    price: null,
    image: '',
    imageBase64: '',
    src_img: '',
    discount: null,
    notes: ''
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
            minLength: 3,
            validation: {
              messages: {
                required: 'Product name is required',
                minlength: 'Product name must be at least 3 characters long'
              }
            }
          },
          className: 'col-12 col-lg-6'
        },
        {
          key: 'category_id',
          type: 'select',
          props: {
            label: 'Category',
            required: true,
            multiple: false,
            placeholder: 'Select a category',
            options: []
          },
          className: 'formly-select-wrapper-3232 col-12 col-lg-6'
        },

        {
          key: 'description',
          type: 'input',
          props: {
            label: 'Description',
            placeholder: 'Enter description',
            required: false, // Ensure required is true
            minLength: 3
          },
          className: 'col-12 col-lg-6'
        },
        {
          key: 'status',
          type: 'select',
          props: {
            label: 'Status',
            required: true,
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]
          },
          className: 'formly-select-wrapper-3232 col-12 col-lg-6'
        },
        {
          key: 'price',
          type: 'input',
          props: {
            label: 'Price',
            required: true,
            placeholder: 'Set a regular price',
            type: 'number'
          },
          className: 'col-12 col-lg-6'
        },
        {
          key: 'image',
          type: 'input',
          props: {
            label: 'Product Image',
            placeholder: 'Enter image URL',
            type: 'file',
            accept: 'image/*',
            required: true, // Ensure required is true
            change: (field, event) => this.onFileChange(field, event, 'imageBase64')
          },
          className: 'formly-image-wrapper-3232 col-12 col-lg-6'
        },
        {
          key: 'discount',
          type: 'input',
          props: {
            label: 'Discount',
            required: false,
            placeholder: 'Set a discount',
            type: 'number'
          },
          className: 'col-12 col-lg-6'
        }
      ]
    }
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
  }

  onInputChange(query: string) {
    this.fetchSuggestions(query); // Fetch and display suggestions based on input
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

    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation styles
      this.form.markAllAsTouched();
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }

    if (this.form.valid) {
      // Create product first without image
      let d = Object.assign({}, this.form.value);
      d['image'] = ''; // Don't include image in initial creation
      d['variation'] = this.variations;

      const res = await this.network.addProduct(d);
      console.log(res);

      if (res && res.item) {
        // Product created successfully, now upload image if selected
        if (this.selectedFile) {
          await this.uploadImage(this.selectedFile, res.item.id);
        }

        this.utility.presentSuccessToast('Product Created Successfully!');
        this.nav.pop();
      } else {
        this.utility.presentFailureToast('Failed to create product');
      }
    }
  }

  onFileChange(field, event: Event, type: string = 'image') {
    const input = event.target as HTMLInputElement;
    this.fileError = ''; // Clear previous errors
    this.selectedFile = null; // Reset selected file

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Check file size
      if (file.size > this.MAX_FILE_SIZE) {
        this.fileError = `File size must be less than ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`;
        input.value = ''; // Clear the input
        return;
      }

      // Store the file object for later upload
      this.selectedFile = file;
      this.model.image = file.name; // Display filename in form

      console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
      // Don't upload yet - wait for form submission
    }
  }

  async uploadImage(file: File, productId: string) {
    try {
      // Upload image for the newly created product
      const res = await this.network.uploadProductImage(file, productId);
      console.log(res);
      if (res) {
        // Store the uploaded image URL (use relative path, not full URL)
        this.model.src_img = res.full_url;
        this.utility.presentSuccessToast('Image uploaded successfully!');
      } else {
        this.fileError = 'Failed to upload image';
        this.utility.presentFailureToast('Failed to upload image');
      }
    } catch (error) {
      this.fileError = 'Error uploading image';
      this.utility.presentFailureToast('Error uploading image');
      console.error('Upload error:', error);
    }
  }

  addAttributes() {
    const input = this.addAttributeInput.trim();

    if (!input) return; // Do nothing if the input is empty

    // Check if the variation type already exists in the list
    const existingVariation = this.variations.find((item) => item.type.toLowerCase() === input.toLowerCase());

    if (!existingVariation) {
      // If variation does not exist, add it using addVariation
      this.addVariation(input);
    } else {
      // If variation exists, select it
      this.selectAttribute(existingVariation.type);
    }

    this.addAttributeInput = ''; // Clear the input
  }

  selectAttribute(type: string) {
    this.variations = this.variations.map((item) => {
      item['selected'] = item.type === type; // Select the matching type
      return item;
    });
  }

  addVariation(type: string) {
    // Deselect all existing variations
    this.variations = this.variations.map((item) => {
      item['selected'] = false;
      return item;
    });

    // Add a new variation with the given type
    this.variations.push({
      type: type, // e.g., "Size"
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
    //   let meta = suggestion.meta_value
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
