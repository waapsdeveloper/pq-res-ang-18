import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderProductsComponent } from './add-order-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    AddOrderProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    AddOrderProductsComponent,
  ]
})
export class AddOrderProductsModule { }
