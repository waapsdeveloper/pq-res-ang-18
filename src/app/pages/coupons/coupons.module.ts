import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons.component';
import { FormsModule } from '@angular/forms';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [CouponsComponent],
  imports: [CommonModule, CouponsRoutingModule, SharedModule, BtopHeaderModule, FormsModule]
})
export class CouponsModule {}
