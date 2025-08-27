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
  // Add state for forgot password
  showForgotPassword = false;
  forgotPasswordForm: FormGroup;
  showResetPassword = false;
  resetPasswordForm: FormGroup;

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
    // Forgot password form
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    // Reset password form
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // superadmin@email.com
  // admin123$

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {}

  toggleForgotPassword(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.showForgotPassword = !this.showForgotPassword;
    this.showResetPassword = false;
  }

  async onResetPassword() {
    if (this.forgotPasswordForm.valid) {
   
        const res = await this.network.forgotPassword(this.forgotPasswordForm.value);
        console.log('Forgot password response:', res);
        if (res == 400 ) {
          this.utility.presentFailureToast(
            typeof res.result === 'string' ? res.result : 'Selected Email is invalid'
          );
        } 
        if(res == 403){
          this.utility.presentFailureToast('Your account is not allowed to login');
        }
        if (res === "We have emailed your password reset link."){
          this.utility.presentSuccessToast(res);
        }
       
      } 
     else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  async onChangePassword() {
    if (this.resetPasswordForm.valid) {
      const data = this.resetPasswordForm.value;
      if (data.password !== data.password_confirmation) {
        this.utility.presentFailureToast('Passwords do not match');
        return;
      }
      try {
        const res = await this.network.resetPassword(data);
        if (res && res.status) {
          this.utility.presentSuccessToast(res.message || 'Password has been reset successfully.');
          this.showResetPassword = false;
          this.showForgotPassword = false;
        } else {
          this.utility.presentFailureToast(res.message || 'Failed to reset password');
        }
      } catch (err: any) {
        this.utility.presentFailureToast(err?.error?.message || 'Failed to reset password');
      }
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

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
