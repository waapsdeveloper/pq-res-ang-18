import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ListProductRoutingModule } from './list-product-routing.module';
import { ListProductComponent } from './list-product.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PipesModule } from "../../../pipes/pipes.module";
import { ListProductStatusComponent } from './list-product-status/list-product-status.component';

@NgModule({
  declarations: [
    ListProductComponent,
    ListProductStatusComponent
  ],
  imports: [
    CommonModule,
    ListProductRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxSkeletonLoaderModule,
    PipesModule
  ]
})
export class ListProductModule { }
