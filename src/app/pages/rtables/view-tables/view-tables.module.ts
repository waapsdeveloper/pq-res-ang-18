import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTablesRoutingModule } from './view-tables-routing.module';
import { ViewTablesComponent } from './view-tables.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';


@NgModule({
  declarations: [
    ViewTablesComponent
  ],
  imports: [
    CommonModule,
    ViewTablesRoutingModule,
    KtListDetailPageModule

  ]
})
export class ViewTablesModule { }
