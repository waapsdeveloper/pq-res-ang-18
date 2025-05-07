import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBranchConfigRoutingModule } from './view-branch-config-routing.module';
import { ViewBranchConfigComponent } from './view-branch-config.component';


@NgModule({
  declarations: [
    ViewBranchConfigComponent
  ],
  imports: [
    CommonModule,
    ViewBranchConfigRoutingModule
  ]
})
export class ViewBranchConfigModule { }
