import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { ViewOrdersRoutingModule } from './view-orders-routing.module';
import { ViewOrdersComponent } from './view-orders.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewOrdersComponent
  ],
  imports: [
    CommonModule,
    ViewOrdersRoutingModule,
    KtListDetailPageModule,
    NgbPopover,
    FormsModule

  ]
})
export class ViewOrdersModule { }
