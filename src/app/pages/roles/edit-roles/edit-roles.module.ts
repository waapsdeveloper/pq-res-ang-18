import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRolesRoutingModule } from './edit-roles-routing.module';
import { EditRolesComponent } from './edit-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [EditRolesComponent],
  imports: [
    CommonModule,
    EditRolesRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditRolesModule {}
