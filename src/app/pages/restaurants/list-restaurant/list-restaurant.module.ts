import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRestaurantRoutingModule } from './list-restaurant-routing.module';
import { ListRestaurantComponent } from './list-restaurant.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    ListRestaurantComponent,
  ],
  imports: [
    CommonModule,
    ListRestaurantRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxSkeletonLoaderModule

  ]
})
export class ListRestaurantModule { }
