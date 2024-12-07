import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListInvoicesRoutingModule } from './list-invoices-routing.module';
import { ListInvoicesComponent } from './list-invoices.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';


@NgModule({
  declarations: [
    ListInvoicesComponent
  ],
  imports: [
    CommonModule,
    ListInvoicesRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
  
  ]
})
export class ListInvoicesModule { }
