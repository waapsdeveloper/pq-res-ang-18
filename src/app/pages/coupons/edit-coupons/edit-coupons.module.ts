import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCouponsRoutingModule } from './edit-coupons-routing.module';
import { EditCouponsComponent } from './edit-coupons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [EditCouponsComponent],
  imports: [
    CommonModule,
    EditCouponsRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class EditCouponsModule {}
