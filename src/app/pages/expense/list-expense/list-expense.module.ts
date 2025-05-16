import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListExpenseRoutingModule } from './list-expense-routing.module';
import { ListExpenseComponent } from './list-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';
import { ListExpenseStatusComponent } from './list-expense-status/list-expense-status.component';

@NgModule({
  declarations: [ListExpenseComponent, ListExpenseStatusComponent],
  imports: [
    CommonModule,
    ListExpenseRoutingModule,
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
export class ListExpenseModule {}
