import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {
  @ViewChild('imageInputPlaceholder') imageInputPlaceholder!: ElementRef;
  restaurantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private network: NetworkService,
    private nav: NavService,
    private utility: UtilityService
  ) {
    this.restaurantForm = this.fb.group({
      name: ['Restaurant one', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: [
        '8957985674',
        [
          Validators.pattern(/^[0-9]{10,15}$/) // Adjust pattern for valid phone number formats
        ]
      ],
      email: ['restaurant1@mail.com', [Validators.email]],
      website: [
        '',
        [
          Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/) // Basic URL validation
        ]
      ],
      opening_hours: ['', Validators.required],
      description: [''],
      rating: [
        Math.floor(Math.random() * 6),
        [
          Validators.min(0),
          Validators.max(5),
          Validators.pattern(/^\d+(\.\d{1,2})?$/) // Validates a number with up to 2 decimal places
        ]
      ],
      status: ['active', Validators.required]
    });
  }

  async onSubmit() {
    console.log('Form Submitted', this.restaurantForm.value);
    if (this.restaurantForm.valid) {
      // alert('Restaurant added successfully!');

      let d = this.restaurantForm.value;
      const res = await this.network.addRestaurant(d);
      console.log(res);
      if (res) {
        this.nav.pop();
      }
    } else {
      this.utility.presentFailureToast('Please fill out all required fields correctly.');
      //alert('Please fill out all required fields correctly.');
    }
  }

  // Method to handle file input change
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Read file as Base64 string
      reader.onload = () => {
        const base64String = reader.result as string;

        // Update the form control with the Base64 string
        this.restaurantForm.patchValue({ image: base64String });

        if (this.imageInputPlaceholder) {
          this.imageInputPlaceholder.nativeElement.style.backgroundImage = `url(${base64String})`;
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsDataURL(file); // Convert file to Base64
    }
  }
}
