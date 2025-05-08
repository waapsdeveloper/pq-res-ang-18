import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBranchConfigRoutingModule } from './add-branch-config-routing.module';
import { AddBranchConfigComponent } from './add-branch-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [AddBranchConfigComponent],
  imports: [
    CommonModule,
    AddBranchConfigRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class AddBranchConfigModule {}
