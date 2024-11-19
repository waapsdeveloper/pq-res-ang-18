import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  showLoader = false;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [true]
    });

  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){

  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
    } else {
      console.error('Form is invalid');
    }
  }



}
