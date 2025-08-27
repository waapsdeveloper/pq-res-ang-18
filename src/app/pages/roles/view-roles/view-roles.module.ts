import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRolesRoutingModule } from './view-roles-routing.module';
import { ViewRolesComponent } from './view-roles.component';


@NgModule({
  declarations: [
    ViewRolesComponent
  ],
  imports: [
    CommonModule,
    ViewRolesRoutingModule
  ]
})
export class ViewRolesModule { }
