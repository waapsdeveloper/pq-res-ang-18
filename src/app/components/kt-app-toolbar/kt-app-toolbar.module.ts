import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtAppToolbarComponent } from './kt-app-toolbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KtAppToolbarBreadcrumbComponent } from './kt-app-toolbar-breadcrumb/kt-app-toolbar-breadcrumb.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    KtAppToolbarComponent,
    KtAppToolbarBreadcrumbComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    KtAppToolbarComponent
  ]
})
export class KtAppToolbarModule { }
