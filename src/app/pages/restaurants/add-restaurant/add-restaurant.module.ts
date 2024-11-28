import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRestaurantRoutingModule } from './add-restaurant-routing.module';
import { AddRestaurantComponent } from './add-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KtAppToolbarModule } from 'src/app/components/kt-app-toolbar/kt-app-toolbar.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';


@NgModule({
  declarations: [
    AddRestaurantComponent
  ],
  imports: [
    CommonModule,
    AddRestaurantRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AddRestaurantModule { }
