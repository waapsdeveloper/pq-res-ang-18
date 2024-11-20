import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTopMenuComponent } from './dashboard-top-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DashboardTopMenuComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    DashboardTopMenuComponent
  ]
})
export class DashboardTopMenuModule { }
