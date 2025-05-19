import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';
import { FormlyTypesModule } from 'src/app/shared/formly-types/formly-types.module';
import { PhoneInputComponent } from 'src/app/shared/formly-types/phone-input/phone-input.type';

@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    FormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minLength', message: 'Min length is {{ requiredLength }}' },
        { name: 'maxLength', message: 'Max length is {{ requiredLength }}' },
        { name: 'pattern', message: 'Invalid input' },
        { name: 'email', message: 'Invalid email address' }
      ],
      extras: {
        showError: (field) => field.formControl && field.formControl.invalid && field.formControl.touched && field.formControl.dirty
        // field.formControl.focused
      }
    }),
    FormlyTypesModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class AddUserModule {}
