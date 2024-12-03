import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOrdersRoutingModule } from './add-orders-routing.module';
import { AddOrdersComponent } from './add-orders.component';
import { AddProductRoutingModule } from '../../products/add-product/add-product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';


@NgModule({
  declarations: [
    AddOrdersComponent
  ],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule
  ]
})
export class AddOrdersModule { }
