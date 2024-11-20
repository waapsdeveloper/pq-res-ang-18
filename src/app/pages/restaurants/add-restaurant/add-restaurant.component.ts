import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {
  restaurantForm: FormGroup;

  constructor(private fb: FormBuilder, private network: NetworkService, private nav: NavService) {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.pattern(/^[0-9]{10,15}$/) // Adjust pattern for valid phone number formats
        ]
      ],
      email: ['', [Validators.email]],
      website: [
        '',
        [
          Validators.pattern(
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
          ) // Basic URL validation
        ]
      ],
      opening_hours: ['', Validators.required],
      description: [''],
      rating: [
        '',
        [
          Validators.min(0),
          Validators.max(5),
          Validators.pattern(/^\d+(\.\d{1,2})?$/) // Validates a number with up to 2 decimal places
        ]
      ]
    });
  }

  async onSubmit() {
    if (this.restaurantForm.valid) {
      console.log('Form Submitted', this.restaurantForm.value);
      // alert('Restaurant added successfully!');


      let d = this.restaurantForm.value;
      const res = await this.network.addRestaurant(d);
      console.log(res);
      this.nav.pop();



    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
