import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtListPageComponent } from './kt-list-page.component';
import { KtAppToolbarModule } from '../../kt-app-toolbar/kt-app-toolbar.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    KtListPageComponent
  ],
  imports: [
    CommonModule,
    KtAppToolbarModule,
    RouterModule
  ],
  exports: [
    KtListPageComponent
  ]
})
export class KtListPageModule { }
