import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtAppFormPageComponent } from './kt-app-form-page.component';
import { KtAppToolbarModule } from '../../kt-app-toolbar/kt-app-toolbar.module';



@NgModule({
  declarations: [
    KtAppFormPageComponent
  ],
  imports: [
    CommonModule,
    KtAppToolbarModule
  ],
  exports: [
    KtAppFormPageComponent
  ]
})
export class KtAppFormPageModule { }
