import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtListDetailPageComponent } from './kt-list-detail-page.component';
import { RouterModule } from '@angular/router';
import { KtAppToolbarModule } from '../../kt-app-toolbar/kt-app-toolbar.module';



@NgModule({
  declarations: [
    KtListDetailPageComponent
  ],
  imports: [
    CommonModule,
    KtAppToolbarModule,
    RouterModule
  ],
  exports: [
    KtListDetailPageComponent
  ]
})
export class KtListDetailPageModule { }
