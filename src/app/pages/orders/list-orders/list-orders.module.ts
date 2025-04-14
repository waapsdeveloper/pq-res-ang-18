import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ListOrdersRoutingModule } from './list-orders-routing.module';
import { ListOrdersComponent } from './list-orders.component';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ListOrderItemStatusModule } from './list-order-item-status/list-order-item-status.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ListOrdersComponent
  ],
  imports: [
    CommonModule,
    ListOrdersRoutingModule,
    KtListPageModule,
    KtAppListPageTableModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxSkeletonLoaderModule,
    ListOrderItemStatusModule,
    NgbDropdownModule


  ],

})
export class ListOrdersModule { }
