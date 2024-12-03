import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProductsRoutingModule } from './view-products-routing.module';
import { ViewProductsComponent } from './view-products.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';


@NgModule({
  declarations: [
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    ViewProductsRoutingModule,
    KtListDetailPageModule

  ]
})
export class ViewProductsModule { }
