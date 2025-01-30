import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditMessageRoutingModule } from './edit-message-routing.module';
import { EditMessageComponent } from './edit-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [EditMessageComponent],
  imports: [
    CommonModule,
    EditMessageRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditMessageModule {}
