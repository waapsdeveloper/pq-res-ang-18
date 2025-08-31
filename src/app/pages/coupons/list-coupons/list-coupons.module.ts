import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCouponsRoutingModule } from './list-coupons-routing.module';
import { ListCouponsComponent } from './list-coupons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [ListCouponsComponent],
  imports: [
    CommonModule,
    ListCouponsRoutingModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxSkeletonLoaderModule,
    KtListPageModule,
    KtAppListPageTableModule,
    PipesModule
  ]
})
export class ListCouponsModule {}
