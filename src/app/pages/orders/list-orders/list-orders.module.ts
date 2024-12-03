import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOrdersRoutingModule } from './list-orders-routing.module';
import { ListOrdersComponent } from './list-orders.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';


@NgModule({
  declarations: [
    ListOrdersComponent
  ],
  imports: [
    CommonModule,
    ListOrdersRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
  ],

})
export class ListOrdersModule { }
