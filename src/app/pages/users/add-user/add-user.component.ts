import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
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
