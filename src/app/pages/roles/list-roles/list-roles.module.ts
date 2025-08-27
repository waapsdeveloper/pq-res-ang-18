import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRolesRoutingModule } from './list-roles-routing.module';
import { ListRolesComponent } from './list-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';

@NgModule({
  declarations: [ListRolesComponent],
  imports: [
    CommonModule,
    ListRolesRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxSkeletonLoaderModule
  ]
})
export class ListRolesModule {}
