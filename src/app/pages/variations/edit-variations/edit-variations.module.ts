import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditVariationsRoutingModule } from './edit-variations-routing.module';
import { EditVariationsComponent } from './edit-variations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [EditVariationsComponent],
  imports: [
    CommonModule,
    EditVariationsRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditVariationsModule {}
