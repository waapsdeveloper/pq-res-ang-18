import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUserRoutingModule } from './list-user-routing.module';
import { ListUserComponent } from './list-user.component';
import { FormsModule } from '@angular/forms';
import { KtAppToolbarModule } from 'src/app/components/kt-app-toolbar/kt-app-toolbar.module';
import { KtAppListPageTableModule } from 'src/app/components/kt-app-list-page-table/kt-app-list-page-table.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListUserComponent
  ],
  imports: [
    CommonModule,
    ListUserRoutingModule,
    FormsModule,
    KtAppToolbarModule,
    KtAppListPageTableModule,
    NgbModule,
  ]
})
export class ListUserModule { }
