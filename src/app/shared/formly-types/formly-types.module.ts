import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material'; // or your UI module
import { PhoneInputComponent } from './phone-input/phone-input.type';

@NgModule({
  declarations: [PhoneInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'phone-input',
          component: PhoneInputComponent,
          wrappers: ['form-field'], // optional: uses Formly's default wrapper
          defaultOptions: {
            defaultValue: {
              countryCode: '',
              number: ''
            }
          }
        }
      ]
    }),

    FormlyMaterialModule
  ],
  exports: [PhoneInputComponent]
})
export class FormlyTypesModule {}
