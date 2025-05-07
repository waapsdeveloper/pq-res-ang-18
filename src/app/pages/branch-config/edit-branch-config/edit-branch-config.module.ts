import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBranchConfigRoutingModule } from './edit-branch-config-routing.module';
import { EditBranchConfigComponent } from './edit-branch-config.component';


@NgModule({
  declarations: [
    EditBranchConfigComponent
  ],
  imports: [
    CommonModule,
    EditBranchConfigRoutingModule
  ]
})
export class EditBranchConfigModule { }
