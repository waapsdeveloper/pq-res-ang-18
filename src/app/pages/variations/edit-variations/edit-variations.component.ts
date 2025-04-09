import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { FieldArrayType } from '@ngx-formly/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-edit-variations',
  templateUrl: './edit-variations.component.html',
  styleUrl: './edit-variations.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditVariationsComponent implements OnInit {
  id;
  item;
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
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
    this.initialize();
  }

  async initialize() {
    // Fetch the data from the server
    const res = await this.network.getVariationsById(this.id);
    let d = Object.assign({}, res.variation);
    if (d['meta_value']) {
      const metaValue = JSON.parse(d['meta_value']);
      this.variations = metaValue;
      console.log(this.variations);
    }
  }

  form = new FormGroup({});
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
            required: true
          },
          className: 'col-md-6 col-12'
        }
      ]
    }
  ];

  async ngAfterViewInit() {
    const res = await this.network.getVariationsById(this.id);
    this.item = res.variation;
    if (this.item && this.item.meta_value) {
      this.item.meta_value = JSON.parse(this.item.meta_value);
    }

    let d = Object.assign({}, this.item);
    console.log(d);
    // Dynamic model assignment
    this.model = {
      name: d.name || '',
      description: d.description || ''
    };
  }

  async onSubmit(model) {
    console.log(model);
    console.log('Form Submitted', this.form.value);
    if (this.form.valid) {
      // alert('Restaurant added successfully!');

      let d = Object.assign({}, this.form.value);
      d['meta_value'] = this.variations;
      const res = await this.network.updateVariation(d, this.id);
      console.log(res);
      if (res) {
        this.utility.presentSuccessToast('Variation Updated!');

        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
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
