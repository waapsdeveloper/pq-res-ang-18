import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRtablesRoutingModule } from './add-rtables-routing.module';
import { AddRtablesComponent } from './add-rtables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';


@NgModule({
  declarations: [
    AddRtablesComponent
  ],
  imports: [
    CommonModule,
    AddRtablesRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class AddRtablesModule { }
