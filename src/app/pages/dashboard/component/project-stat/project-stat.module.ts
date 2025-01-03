import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';

import { ProjectStatRoutingModule } from './project-stat-routing.module';
import { ProjectStatComponent } from './project-stat.component';


@NgModule({
  declarations: [] ,
  imports: [
    CommonModule,
    ProjectStatRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
    ProjectStatComponent
  ]
})
export class ProjectStatModule { }
