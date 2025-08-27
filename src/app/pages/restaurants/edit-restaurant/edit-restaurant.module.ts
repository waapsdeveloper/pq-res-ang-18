import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRestaurantRoutingModule } from './edit-restaurant-routing.module';
import { EditRestaurantComponent } from './edit-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KtAppToolbarModule } from 'src/app/components/kt-app-toolbar/kt-app-toolbar.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [EditRestaurantComponent],
  imports: [
    CommonModule,
    EditRestaurantRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditRestaurantModule {}
