import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUsersRoutingModule } from './view-users-routing.module';
import { ViewUsersComponent } from './view-users.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';


@NgModule({
  declarations: [
    ViewUsersComponent
  ],
  imports: [
    CommonModule,
    ViewUsersRoutingModule,
    KtListDetailPageModule

  ]
})
export class ViewUsersModule { }
