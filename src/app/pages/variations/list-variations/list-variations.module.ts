import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListVariationsRoutingModule } from './list-variations-routing.module';
import { ListVariationsComponent } from './list-variations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';
import { ListVariationTagsComponent } from './list-variation-tags/list-variation-tags.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [ListVariationsComponent, ListVariationTagsComponent],
  imports: [
    CommonModule,
    ListVariationsRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxSkeletonLoaderModule,
    NgbPopoverModule,
    PipesModule
  ],
  exports: [ListVariationTagsComponent]
})
export class ListVariationsModule {}
