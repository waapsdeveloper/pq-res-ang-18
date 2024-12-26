import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { KtAppFormPageModule } from '../../../components/layouts/kt-app-form-page/kt-app-form-page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [EditUserComponent],
  imports: [CommonModule, EditUserRoutingModule, KtAppFormPageModule, FormsModule, FormlyModule, ReactiveFormsModule, FormlyBootstrapModule]
})
export class EditUserModule {}
