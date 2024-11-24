import { Component, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  @ViewChild('imageInputPlaceholder') imageInputPlaceholder!: ElementRef;
  bForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      status: ['', Validators.required],

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
        this.bForm.patchValue({ image: base64String });

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
