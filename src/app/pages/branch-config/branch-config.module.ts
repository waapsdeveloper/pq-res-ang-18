import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchConfigRoutingModule } from './branch-config-routing.module';
import { BranchConfigComponent } from './branch-config.component';


@NgModule({
  declarations: [
    BranchConfigComponent
  ],
  imports: [
    CommonModule,
    BranchConfigRoutingModule
  ]
})
export class BranchConfigModule { }
