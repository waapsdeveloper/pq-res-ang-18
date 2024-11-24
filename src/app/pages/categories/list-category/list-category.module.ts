import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategoryRoutingModule } from './list-category-routing.module';
import { ListCategoryComponent } from './list-category.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KtAppListPageTableModule } from 'src/app/components/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtAppToolbarModule } from 'src/app/components/kt-app-toolbar/kt-app-toolbar.module';


@NgModule({
  declarations: [
    ListCategoryComponent
  ],
  imports: [
    CommonModule,
    ListCategoryRoutingModule,
    FormsModule,
    KtAppToolbarModule,
    KtAppListPageTableModule,
    NgbModule,
  ]
})
export class ListCategoryModule { }
