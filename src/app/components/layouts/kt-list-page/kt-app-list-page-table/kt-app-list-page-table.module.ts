import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtAppListPageTableComponent } from './kt-app-list-page-table.component';
import { RouterModule } from '@angular/router';
import { KtAppToolbarModule } from '../../../kt-app-toolbar/kt-app-toolbar.module';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    KtAppListPageTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    KtAppToolbarModule,
    FormsModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    KtAppListPageTableComponent
  ]
})
export class KtAppListPageTableModule { }
