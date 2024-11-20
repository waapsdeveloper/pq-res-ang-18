import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {
  bForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.bForm.valid) {
      console.log('Form Submitted', this.bForm.value);
      alert('Form Submitted Successfully!');
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
