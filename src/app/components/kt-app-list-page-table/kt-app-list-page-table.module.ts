import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtAppListPageTableComponent } from './kt-app-list-page-table.component';
import { RouterModule } from '@angular/router';
import { KtAppToolbarModule } from '../kt-app-toolbar/kt-app-toolbar.module';



@NgModule({
  declarations: [
    KtAppListPageTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    KtAppToolbarModule
  ],
  exports: [
    KtAppListPageTableComponent
  ]
})
export class KtAppListPageTableModule { }
