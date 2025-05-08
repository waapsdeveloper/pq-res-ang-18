import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBranchConfigRoutingModule } from './edit-branch-config-routing.module';
import { EditBranchConfigComponent } from './edit-branch-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [EditBranchConfigComponent],
  imports: [
    CommonModule,
    EditBranchConfigRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditBranchConfigModule {}
