import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRestaurantRoutingModule } from './list-restaurant-routing.module';
import { ListRestaurantComponent } from './list-restaurant.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KtAppToolbarModule } from 'src/app/components/kt-app-toolbar/kt-app-toolbar.module';
import { KtAppListPageTableModule } from 'src/app/components/kt-app-list-page-table/kt-app-list-page-table.module';


@NgModule({
  declarations: [
    ListRestaurantComponent,
  ],
  imports: [
    CommonModule,
    ListRestaurantRoutingModule,
    KtAppToolbarModule,
    KtAppListPageTableModule,
    FormsModule,
    NgbModule,
]
})
export class ListRestaurantModule { }
