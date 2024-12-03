import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCategoriesRoutingModule } from './view-categories-routing.module';
import { ViewCategoriesComponent } from './view-categories.component';
import { KtListDetailPageModule } from 'src/app/components/layouts/kt-list-detail-page/kt-list-detail-page.module';


@NgModule({
  declarations: [
    ViewCategoriesComponent
  ],
  imports: [
    CommonModule,
    ViewCategoriesRoutingModule,
    KtListDetailPageModule

  ]
})
export class ViewCategoriesModule { }
