import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { NavService } from 'src/app/services/basic/nav.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form = new FormGroup({});
  productId: string;
  name = '';
  category_id = '';
  description = '';
  status = '';
  price = null;
  image = '';
  imageBase64 = '';
  discount = null;
  notes = '';
  variations: any[] = [];
  filteredSuggestions: any[] = [];
  private searchSubject = new Subject<string>();
  addAttributeInput = ''; // Declare the missing property


  categories: any[] = [];
  restaurants: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private network: NetworkService,
    private utility: UtilityService,
    private nav: NavService
  ) {}

  ngOnInit(): void {
    this.setCategoriesInForm();
    this.setRestaurantsInForm();

    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProductDetails();

    // Initialize searchSubject for debounced suggestions
    this.searchSubject
      .pipe(
        debounceTime(300), // Delay for user input
        distinctUntilChanged(), // Ignore identical inputs
        switchMap(async (query) => {
          await this.fetchSuggestions(query);
          return this.filteredSuggestions;
        })
      )
      .subscribe((suggestions) => {
        this.filteredSuggestions = suggestions;
      });
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

  async loadProductDetails() {
    const res = await this.network.getProductsById(this.productId);
    if (res) {
      const product = res.data;
      this.name = product.name;
      this.category_id = product.category_id;
      this.description = product.description;
      this.status = product.status;
      this.price = product.price;
      this.imageBase64 = product.image; // Assuming the API returns a Base64 image
      this.discount = product.discount;
      this.notes = product.notes;
      this.variations = product.variations || [];
    }
  }

  async onSubmit() {
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

    console.log('Form data being submitted:', formData);

    const res = await this.network.updateProduct(this.productId, formData);

    console.log('API Response:', res);

    if (res) {
      this.utility.presentSuccessToast('Product Updated Successfully!');
      this.nav.pop();
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addVariation(type: string) {
    this.variations.push({
      type: type,
      selected: false,
      options: [{ name: '', description: '', price: 0 }]
    });
  }

  addOption(variationIndex: number) {
    this.variations[variationIndex].options.push({ name: '', description: '', price: 0 });
  }

  removeOption(variationIndex: number, optionIndex: number) {
    this.variations[variationIndex].options.splice(optionIndex, 1);
  }

  // Fetch suggestions based on user input
  async fetchSuggestions(query: string) {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      this.filteredSuggestions = []; // Clear suggestions if input is empty
      return;
    }

    const obj = {
      search: trimmedQuery
    };

    const res = await this.network.getVariations(obj);
    const array = res?.data?.data || [];
    this.filteredSuggestions = array;
  }

  // Handle input change for suggestions
  onInputChange(query: string) {
    this.searchSubject.next(query); // Trigger debounced search
  }

  // Select a suggestion and update variations
  selectSuggestion(suggestion: any) {
    console.log(suggestion);
    const meta = JSON.parse(suggestion.meta_value);
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

  addItemINVariation() {
    const index = this.variations.findIndex((x) => x.selected == true);
    if (index == -1) {
      return;
    }

    this.variations[index]['options'].push({ name: '', description: '', price: 0 });
  }
}
