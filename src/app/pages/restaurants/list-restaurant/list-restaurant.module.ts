import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRestaurantRoutingModule } from './list-restaurant-routing.module';
import { ListRestaurantComponent } from './list-restaurant.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KtAppToolbarModule } from 'src/app/components/kt-app-toolbar/kt-app-toolbar.module';
import { KtAppTableSearchModule } from 'src/app/components/kt-app-table-search/kt-app-table-search.module';
import { KtAppTableModule } from 'src/app/components/kt-app-table/kt-app-table.module';


@NgModule({
  declarations: [
    ListRestaurantComponent,
  ],
  imports: [
    CommonModule,
    ListRestaurantRoutingModule,
    KtAppToolbarModule,
    KtAppTableSearchModule,
    KtAppTableModule,
    FormsModule,
    NgbModule,
]
})
export class ListRestaurantModule { }
