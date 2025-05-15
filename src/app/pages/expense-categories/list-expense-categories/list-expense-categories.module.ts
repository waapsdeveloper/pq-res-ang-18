import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListExpenseCategoriesRoutingModule } from './list-expense-categories-routing.module';
import { ListExpenseCategoriesComponent } from './list-expense-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtAppFormPageModule } from 'src/app/components/layouts/kt-app-form-page/kt-app-form-page.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';

@NgModule({
  declarations: [ListExpenseCategoriesComponent],
  imports: [
    CommonModule,
    ListExpenseCategoriesRoutingModule,
    KtAppListPageTableModule,
    KtListPageModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxSkeletonLoaderModule,
    NgbDropdownModule
  ]
})
export class ListExpenseCategoriesModule {}
