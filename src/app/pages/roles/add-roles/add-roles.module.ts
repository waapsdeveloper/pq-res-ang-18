import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRolesRoutingModule } from './add-roles-routing.module';
import { AddRolesComponent } from './add-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [AddRolesComponent],
  imports: [CommonModule, AddRolesRoutingModule, FormsModule, FormlyModule, ReactiveFormsModule, FormlyBootstrapModule, KtAppFormPageModule]
})
export class AddRolesModule {}
