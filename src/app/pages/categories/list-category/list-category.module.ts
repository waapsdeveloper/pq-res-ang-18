import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ListCategoryRoutingModule } from './list-category-routing.module';
import { ListCategoryComponent } from './list-category.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    ListCategoryComponent
  ],
  imports: [
    CommonModule,
    ListCategoryRoutingModule,
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
export class ListCategoryModule { }
