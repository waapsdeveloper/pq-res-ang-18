import { Component ,OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent  implements OnInit{

 id;

  constructor(private route: ActivatedRoute, private network: NetworkService) {

  }

  ngOnInit() {
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);
   this.initialize();



  }

  async initialize(){
    // Fetch the data from the server
    const res = await this.network.getProductsById(this.id);
    console.log(res);
    this.model=res.product;
  }
  onSubmit(model){}
  form = new FormGroup({});
    model = {
      name: '',
      category: '',
      restaurant_id: null,
      description: '',
      status: '',
      price: null,
      image: null,
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
            key: 'category',
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
              options: [
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
              label: 'Product Image',
              placeholder: 'Upload product image',
              type: 'file',
              accept: 'image/'
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
            className: 'col-md-4 col-12',
          },

        ],
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
            className: 'col-md-4 col-12',
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
            className: 'col-md-4 col-12',
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
            className: 'col-md-4 col-12',
          },
        ]
      }
    ];

}
