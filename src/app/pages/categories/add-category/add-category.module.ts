import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategoryRoutingModule } from './add-category-routing.module';
import { AddCategoryComponent } from './add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';


@NgModule({
  declarations: [
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    AddCategoryRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class AddCategoryModule { }
