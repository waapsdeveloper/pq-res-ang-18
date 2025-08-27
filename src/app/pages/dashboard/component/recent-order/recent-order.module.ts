import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';

import { RecentOrderRoutingModule } from './recent-order-routing.module';
import { ListOrderPaymentStatusModule } from 'src/app/pages/orders/list-orders/list-order-payment-status/list-order-payment-status.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecentOrderRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
    ListOrderPaymentStatusModule

  ]
})
export class RecentOrderModule { }
