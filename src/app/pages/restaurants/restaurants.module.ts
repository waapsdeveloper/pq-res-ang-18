import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RestaurantsComponent
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    // SharedModule,
    BtopHeaderModule,
    FormsModule,
    SharedModule
]
})
export class RestaurantsModule { }
