import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRtablesRoutingModule } from './edit-rtables-routing.module';
import { EditRtablesComponent } from './edit-rtables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [EditRtablesComponent],
  imports: [
    CommonModule,
    EditRtablesRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditRtablesModule {}
