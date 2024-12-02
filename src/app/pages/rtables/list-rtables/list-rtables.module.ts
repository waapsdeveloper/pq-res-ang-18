import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRtablesRoutingModule } from './list-rtables-routing.module';
import { ListRtablesComponent } from './list-rtables.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';


@NgModule({
  declarations: [
    ListRtablesComponent
  ],
  imports: [
    CommonModule,
    ListRtablesRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
  ]
})
export class ListRtablesModule { }
