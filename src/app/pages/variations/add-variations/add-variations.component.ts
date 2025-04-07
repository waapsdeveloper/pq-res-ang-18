import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-variations',
  templateUrl: './add-variations.component.html',
  styleUrl: './add-variations.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddVariationsComponent {
  form = new FormGroup({});
  filteredSuggestions: any[] = [];
  private searchSubject = new Subject<string>();
  variations: any[] = [];
  addAttributeInput = '';

  model = {
    name: '',
    description: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          props: {
            label: 'Enter Variation Name',
            placeholder: 'Enter name',
            required: true
          },
          className: 'col-md-6 col-12'
        },
        {
          key: 'description',
          type: 'textarea',
          props: {
            label: 'Description',
            placeholder: 'Enter a description',
            required: false
          },
          className: 'col-md-6 col-12'
        }
      ]
    }
  ];

  constructor(
    private nav: NavService,
    private network: NetworkService,
    private utility: UtilityService
  ) {}

  ngOnInit(): void {}

  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.valid);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = this.form.value;
      d['meta_value'] = this.variations;
      const res = await this.network.addVariations(d);

      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Variations Created Succesfully!')

        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
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

  onInputChange(query: string) {
    this.fetchSuggestions(query); // Fetch and display suggestions based on input
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
  // Method to handle file input change

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
