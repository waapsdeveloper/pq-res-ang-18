import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { RestaurantMenuRoutingModule } from './restaurant-menu-routing.module';
import { RestaurantMenuComponent } from './restaurant-menu.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryTypeheadComponent } from './category-typehead/category-typehead.component';
import { ProductTypeheadComponent } from './product-typehead/product-typehead.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  declarations: [
    RestaurantMenuComponent,
    CategoryTypeheadComponent,
    ProductTypeheadComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    RestaurantMenuRoutingModule,
    FormsModule,
    NgbModule,

    NgbTypeaheadModule, FormsModule, JsonPipe
  ]
})
export class RestaurantMenuModule { }
