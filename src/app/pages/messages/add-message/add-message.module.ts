import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMessageRoutingModule } from './add-message-routing.module';
import { AddMessageComponent } from './add-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [AddMessageComponent],
  imports: [
    CommonModule,
    AddMessageRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class AddMessageModule {}
