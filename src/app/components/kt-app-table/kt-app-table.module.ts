import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtAppTableComponent } from './kt-app-table.component';



@NgModule({
  declarations: [
    KtAppTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KtAppTableComponent
  ]
})
export class KtAppTableModule { }
