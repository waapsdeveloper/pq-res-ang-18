import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBranchConfigRoutingModule } from './add-branch-config-routing.module';
import { AddBranchConfigComponent } from './add-branch-config.component';


@NgModule({
  declarations: [
    AddBranchConfigComponent
  ],
  imports: [
    CommonModule,
    AddBranchConfigRoutingModule
  ]
})
export class AddBranchConfigModule { }
