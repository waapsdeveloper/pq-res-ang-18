import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductRoutingModule } from './list-product-routing.module';
import { ListProductComponent } from './list-product.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';


@NgModule({
  declarations: [
    ListProductComponent
  ],
  imports: [
    CommonModule,
    ListProductRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
  ]
})
export class ListProductModule { }
