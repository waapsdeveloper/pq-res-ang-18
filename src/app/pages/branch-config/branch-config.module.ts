import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchConfigRoutingModule } from './branch-config-routing.module';
import { BranchConfigComponent } from './branch-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BranchConfigComponent],
  imports: [CommonModule, BranchConfigRoutingModule, SharedModule, BtopHeaderModule, FormsModule]
})
export class BranchConfigModule {}
