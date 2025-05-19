import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { KtAppFormPageModule } from '../../../components/layouts/kt-app-form-page/kt-app-form-page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyTypesModule } from 'src/app/shared/formly-types/formly-types.module';
import { PhoneInputComponent } from 'src/app/shared/formly-types/phone-input/phone-input.type';
@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    KtAppFormPageModule,
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
    FormlyBootstrapModule
  ]
})
export class EditUserModule {}
