import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCouponsRoutingModule } from './view-coupons-routing.module';
import { ViewCouponsComponent } from './view-coupons.component';
import { QrCodeModule } from 'ng-qrcode';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';

@NgModule({
  declarations: [ViewCouponsComponent],
  imports: [CommonModule, ViewCouponsRoutingModule, KtListDetailPageModule, QrCodeModule]
})
export class ViewCouponsModule {}
