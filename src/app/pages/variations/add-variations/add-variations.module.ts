import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddVariationsRoutingModule } from './add-variations-routing.module';
import { AddVariationsComponent } from './add-variations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';
import { FilterSelectedModule } from '../../products/filter-selected/filter-selected.module';

@NgModule({
  declarations: [AddVariationsComponent],
  imports: [
    CommonModule,
    AddVariationsRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule,
    FilterSelectedModule
  ]
})
export class AddVariationsModule {}
