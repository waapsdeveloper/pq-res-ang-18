import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOrdersRoutingModule } from './add-orders-routing.module';
import { AddOrdersComponent } from './add-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';
import { AddOrderCategoriesModule } from './add-order-categories/add-order-categories.module';
import { AddOrderProductsModule } from './add-order-products/add-order-products.module';
import { AddOrderPriceListModule } from './add-order-price-list/add-order-price-list.module';
import { AddOrderTableModule } from './add-order-table/add-order-table.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AddOrdersComponent],
  imports: [
    CommonModule,
    AddOrdersRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    KtAppFormPageModule,
    NgSelectModule,
    // order items modules
    AddOrderCategoriesModule,
    AddOrderProductsModule,
    AddOrderPriceListModule,
    AddOrderTableModule
  ]
})
export class AddOrdersModule {}
