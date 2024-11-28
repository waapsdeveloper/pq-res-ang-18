import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRestaurantRoutingModule } from './list-restaurant-routing.module';
import { ListRestaurantComponent } from './list-restaurant.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KtAppListPageTableModule } from 'src/app/components/layouts/kt-list-page/kt-app-list-page-table/kt-app-list-page-table.module';
import { KtListPageModule } from 'src/app/components/layouts/kt-list-page/kt-list-page.module';


@NgModule({
  declarations: [
    ListRestaurantComponent,
  ],
  imports: [
    CommonModule,
    ListRestaurantRoutingModule,
    FormsModule,
    NgbModule,
    KtListPageModule,
    KtAppListPageTableModule,

]
})
export class ListRestaurantModule { }
