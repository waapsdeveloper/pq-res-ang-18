import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategoryRoutingModule } from './list-category-routing.module';
import { ListCategoryComponent } from './list-category.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';


@NgModule({
  declarations: [
    ListCategoryComponent
  ],
  imports: [
    CommonModule,
    ListCategoryRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
  ]
})
export class ListCategoryModule { }
