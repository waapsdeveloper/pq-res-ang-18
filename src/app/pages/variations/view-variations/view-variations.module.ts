import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewVariationsRoutingModule } from './view-variations-routing.module';
import { ViewVariationsComponent } from './view-variations.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';


@NgModule({
  declarations: [
    ViewVariationsComponent
  ],
  imports: [
    CommonModule,
    ViewVariationsRoutingModule,
    KtListDetailPageModule
  ]
})
export class ViewVariationsModule { }
