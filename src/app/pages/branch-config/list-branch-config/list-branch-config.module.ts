import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListBranchConfigRoutingModule } from './list-branch-config-routing.module';
import { ListBranchConfigComponent } from './list-branch-config.component';


@NgModule({
  declarations: [
    ListBranchConfigComponent
  ],
  imports: [
    CommonModule,
    ListBranchConfigRoutingModule
  ]
})
export class ListBranchConfigModule { }
