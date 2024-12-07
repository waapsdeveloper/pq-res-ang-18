import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';
import { ViewInvoicesRoutingModule } from './view-invoices-routing.module';
import { ViewInvoicesComponent } from './view-invoices.component';


@NgModule({
  declarations: [
    ViewInvoicesComponent
  ],
  imports: [
    CommonModule,
    ViewInvoicesRoutingModule,    
    KtListDetailPageModule

  ]
})
export class ViewInvoicesModule { }
