import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  showLoader = false;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private network: NetworkService,
    private users: UsersService,
    private nav: NavService,
    public utility: UtilityService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [true]
    });
  }
  // superadmin@email.com
  // admin123$

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {}

  async onSubmit() {
    if (this.loginForm.valid) {
      this.showLoader = true;
      console.log('Form Submitted:', this.loginForm.value);

      let d = this.loginForm.value;
      let formdata = {
        email: d.email,
        password: d.password
      };
      const res = (await this.network.loginViaEmail(d)) as any;

      if (res) {
        console.log(res);

        if (res == 400) {
          this.utility.presentFailureToast('Invalid email or password');
          this.showLoader = false;
          return;
        }
        if (res == 403) {
          this.utility.presentFailureToast('Your account is not allowed to login');
          this.showLoader = false;
          return;
        }

        if (res.user) {
          localStorage.setItem('token', res.token);
          await this.users.setUser(res.user);
          this.nav.push('pages/pre-splash');
        }
      }

      this.showLoader = false;
    } else {
      console.error('Form is invalid');
    }
  }
}
