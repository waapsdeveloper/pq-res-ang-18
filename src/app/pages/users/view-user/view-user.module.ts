import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUserRoutingModule } from './view-user-routing.module';
import { ViewUserComponent } from './view-user.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';


@NgModule({
  declarations: [
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    ViewUserRoutingModule,
    KtListDetailPageModule

  ]
})
export class ViewUserModule { }
