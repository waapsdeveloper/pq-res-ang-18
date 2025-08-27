import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddCategoryComponent implements OnInit {
  form = new FormGroup({});
  model = {
    name: '',
    category_id: '',
    status: 'active',
    description: '',
    image: '',
    imageBase64: '',
    src_img: ''
  };

  // File size limit - 1MB
  readonly MAX_FILE_SIZE = 3 * 1024 * 1024; // 1MB in bytes

  // File validation variables
  selectedFile: File | null = null;
  fileError: string = '';

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
          className: 'col-md-6 col-12' // 3 columns on md+, full width on small screens
        },

        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter description',
            required: false
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'category_id',
          type: 'select',
          props: {
            label: 'Category',
            placeholder: 'Select a parent category',
            options: [{ value: '', label: 'Select a parent category' }]
          },
          className: 'formly-select-wrapper-3232 col-md-6 col-12'
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
            required: true
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
            required: true,
            change: (field, event) => this.onFileChange(field, event, 'imageBase64')
          },
          className: 'formly-image-wrapper-3232 col-md-6 col-12'
        },
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
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation styles
      this.form.markAllAsTouched();
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      return;
    }

    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // Create category first without image
      let d = Object.assign({}, this.form.value);
      d['image'] = ''; // Don't include image in initial creation

      const res = await this.network.addCategory(d);
      console.log(res);

      if (res && res.Category) {
        // Category created successfully, now upload image if selected
        if (this.selectedFile) {
          await this.uploadImage(this.selectedFile, res.Category.id);
        }

        this.utility.presentSuccessToast('Category Created Successfully!');
        this.nav.pop();
      } else {
        this.utility.presentFailureToast('Failed to create category');
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
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

  async uploadImage(file: File, categoryId: string) {
    try {
      // Upload image for the newly created category
      const res = await this.network.uploadCategoryImage(file, categoryId);
      console.log(res);
      if (res) {
        // Store the uploaded image URL (use relative path, not full URL)
        this.model.src_img = res.image_url;
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
}
