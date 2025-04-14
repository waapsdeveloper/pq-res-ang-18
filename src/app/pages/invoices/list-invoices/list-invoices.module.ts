import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ListInvoicesRoutingModule } from './list-invoices-routing.module';
import { ListInvoicesComponent } from './list-invoices.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ListInvoicesItemStatusModule } from './list-invoices-item-status/list-order-item-status.module';


@NgModule({
  declarations: [
    ListInvoicesComponent
  ],
  imports: [
    CommonModule,
    ListInvoicesRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxSkeletonLoaderModule,

    ListInvoicesItemStatusModule

  ]
})
export class ListInvoicesModule { }
