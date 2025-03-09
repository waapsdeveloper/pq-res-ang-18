import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCouponsRoutingModule } from './add-coupons-routing.module';
import { AddCouponsComponent } from './add-coupons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';

@NgModule({
  declarations: [AddCouponsComponent],
  imports: [
    CommonModule,
    AddCouponsRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class AddCouponsModule {}
