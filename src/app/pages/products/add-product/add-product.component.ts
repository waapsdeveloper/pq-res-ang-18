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
  name = '';
  category_id = '';
  description = '';
  status = '';
  price = null;
  image = '';
  imageBase64 = '';
  discount = null;
  notes = '';

  model = {
    name: '',
    category_id: '',
    description: '',
    status: '',
    price: null,
    image: '',
    imageBase64: '',
    discount: null,
    notes: ''
  };

  categories: any[] = [];
  restaurants: any[] = [];

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
    this.restaurants = res;


  }
  async setCategoriesInForm() {
    const res = await this.getCategories();
    console.log(res);
    this.categories = res;
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

  async onSubmit() {
    // Prepare the data object from local variables
    const formData = {
      name: this.name,
      category_id: this.category_id,
      description: this.description,
      status: this.status,
      price: this.price,
      image: this.imageBase64, // Using the base64 encoded image
      discount: this.discount,
      notes: this.notes,
      variation: this.variations
    };

    // Log the data to console first
    console.log('Form data being submitted:', formData);

    // Send to API (assuming this.network.addProduct exists)
    const res = await this.network.addProduct(formData);

    console.log('API Response:', res);

    if (res) {
      this.utility.presentSuccessToast('Product Created Successfully!');
      this.nav.pop();
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
