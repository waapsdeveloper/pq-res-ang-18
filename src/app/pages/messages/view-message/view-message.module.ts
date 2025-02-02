import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewMessageRoutingModule } from './view-message-routing.module';
import { ViewMessageComponent } from './view-message.component';
import { QrCodeModule } from 'ng-qrcode';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewMessageComponent],
  imports: [CommonModule, ViewMessageRoutingModule, KtListDetailPageModule, FormsModule]
})
export class ViewMessageModule {}
