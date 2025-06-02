import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { FormsModule } from '@angular/forms';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RolesComponent],
  imports: [CommonModule, RolesRoutingModule, SharedModule, BtopHeaderModule, FormsModule]
})
export class RolesModule {}
